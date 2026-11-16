import { store } from '../data/store.js';
import { calculateSmartPrice } from '../utils/smartPricing.js';
import { generateQrDataUrl } from '../utils/qrGenerator.js';

export const previewPrice = async (req, res) => {
  try {
    const { vehicleId, pickupDate, returnDate, insurancePlan, addOns, pointsToRedeem } = req.body;

    const vehicle = store.getVehicleById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    if (!pickupDate || !returnDate) {
      return res.status(400).json({ message: 'Pickup and return dates are required' });
    }

    const priceBreakdown = calculateSmartPrice({
      vehicle,
      pickupDate,
      returnDate,
      insurancePlan,
      addOns: addOns || [],
      pointsToRedeem: Number(pointsToRedeem) || 0,
    });

    return res.json(priceBreakdown);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createBooking = async (req, res) => {
  try {
    const {
      vehicleId,
      pickupDate,
      returnDate,
      pickupLocation,
      returnLocation,
      insurancePlan,
      addOns,
      paymentMethod,
      cardNumber,
      signatureDataUrl,
      pointsToRedeem,
    } = req.body;

    const vehicle = store.getVehicleById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    if (!vehicle.isAvailable) {
      return res.status(400).json({ message: 'Vehicle is currently unavailable or booked' });
    }

    const pricing = calculateSmartPrice({
      vehicle,
      pickupDate,
      returnDate,
      insurancePlan,
      addOns: addOns || [],
      pointsToRedeem: Number(pointsToRedeem) || 0,
    });

    // Check digital agreement signature
    if (!signatureDataUrl) {
      return res.status(400).json({ message: 'Digital rental agreement signature is required' });
    }

    // Deduct redeemed points from user if applicable
    if (pointsToRedeem && pointsToRedeem > 0) {
      if ((req.user.loyaltyPoints || 0) < pointsToRedeem) {
        return res.status(400).json({ message: 'Insufficient loyalty reward points' });
      }
      req.user.loyaltyPoints = Math.max(0, req.user.loyaltyPoints - pointsToRedeem);
      store.updateUser(req.user._id, { loyaltyPoints: req.user.loyaltyPoints });
    }

    // Generate unique verification token & QR code
    const tempBookingId = 'VR-' + Math.floor(10000 + Math.random() * 90000);
    const verificationPayload = {
      bookingId: tempBookingId,
      userId: req.user._id,
      customerName: req.user.name,
      vehicle: `${vehicle.year} ${vehicle.brand} ${vehicle.model}`,
      licensePlate: vehicle.registrationPlate,
      pickupDate,
      returnDate,
      pickupLocation: pickupLocation || vehicle.location.address,
      status: 'VERIFIED_PAID',
    };

    const qrDataUrl = await generateQrDataUrl(verificationPayload);

    const booking = store.createBooking({
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone || '',
      },
      vehicle,
      pickupDate,
      returnDate,
      pickupLocation: pickupLocation || vehicle.location.address,
      returnLocation: returnLocation || pickupLocation || vehicle.location.address,
      durationDays: pricing.durationDays,
      pricing,
      insurance: {
        plan: insurancePlan || 'None',
        dailyFee: pricing.insuranceDailyRate,
      },
      addOns: addOns || [],
      payment: {
        method: paymentMethod || 'credit_card',
        last4: cardNumber ? cardNumber.slice(-4) : '4242',
        transactionId: 'TXN_' + Date.now().toString(36).toUpperCase() + Math.floor(1000 + Math.random() * 9000),
      },
      agreement: {
        signed: true,
        signatureDataUrl,
        signedAt: new Date().toISOString(),
        termsAccepted: true,
      },
      qrCode: qrDataUrl || tempBookingId,
      telematics: {
        ...vehicle.telematics,
        status: 'Reserved for Pickup',
      },
    });

    return res.status(201).json({
      message: 'Booking successfully confirmed!',
      booking,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = store.getBookingsByUserId(req.user._id);
    return res.json(bookings);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = store.getBookingById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Customer can only view their own booking unless admin
    if (req.user.role !== 'admin' && booking.user._id !== req.user._id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    return res.json(booking);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = store.getBookingById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (req.user.role !== 'admin' && booking.user._id !== req.user._id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (booking.status === 'completed' || booking.status === 'cancelled') {
      return res.status(400).json({ message: `Booking is already ${booking.status}` });
    }

    const updated = store.updateBookingStatus(booking._id, 'cancelled');
    updated.payment.status = 'refunded';

    return res.json({
      message: 'Booking cancelled and refund initiated successfully',
      booking: updated,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyQr = async (req, res) => {
  try {
    const { token } = req.params;
    const booking = store.getBookingByQr(token);
    if (!booking) {
      return res.status(404).json({
        verified: false,
        message: 'No matching reservation found for this QR pass code',
      });
    }

    return res.json({
      verified: true,
      bookingId: booking.bookingId,
      customer: booking.user.name,
      vehicle: `${booking.vehicle.year} ${booking.vehicle.brand} ${booking.vehicle.model}`,
      licensePlate: booking.vehicle.registrationPlate,
      pickupDate: booking.pickupDate,
      returnDate: booking.returnDate,
      status: booking.status,
      paymentStatus: booking.payment.status,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

