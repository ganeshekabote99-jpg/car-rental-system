import bcrypt from 'bcryptjs';
import { initialVehicles } from './seedVehicles.js';

// Pre-hashed passwords for quick dev initialization
// 'admin123' and 'pass123'
const ADMIN_HASH = bcrypt.hashSync('admin123', 10);
const CUSTOMER_HASH = bcrypt.hashSync('pass123', 10);

class DataStore {
  constructor() {
    this.users = [
      {
        _id: 'usr_admin',
        name: 'Alex Vance (Fleet Director)',
        email: 'admin@rentride.com',
        password: ADMIN_HASH,
        role: 'admin',
        phone: '+1 (415) 555-0199',
        drivingLicense: {
          number: 'DL-98241029-CA',
          verified: true,
          expiryDate: '2028-10-15',
        },
        loyaltyPoints: 3450,
        loyaltyTier: 'Platinum',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        createdAt: new Date('2024-01-01'),
      },
      {
        _id: 'usr_customer',
        name: 'Sarah Connor',
        email: 'customer@rentride.com',
        password: CUSTOMER_HASH,
        role: 'customer',
        phone: '+1 (212) 555-0144',
        drivingLicense: {
          number: 'DL-44810293-NY',
          verified: true,
          expiryDate: '2027-08-20',
        },
        loyaltyPoints: 680,
        loyaltyTier: 'Gold',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        createdAt: new Date('2024-02-15'),
      },
    ];

    this.vehicles = JSON.parse(JSON.stringify(initialVehicles));

    this.pricingConfig = {
      baseSurgeMultiplier: 1.0,
      weekendMultiplier: 1.15, // 15% surge on Fri-Sun
      holidaySurgeActive: false,
      loyaltyRedemptionRate: 0.05, // 100 points = $5
      discounts: {
        threeDaysPlus: 0.05, // 5% discount
        sevenDaysPlus: 0.12, // 12% discount
        fourteenDaysPlus: 0.20, // 20% discount
      },
    };

    this.bookings = [
      {
        _id: 'bk_1001',
        bookingId: 'VR-88210',
        user: {
          _id: 'usr_customer',
          name: 'Sarah Connor',
          email: 'customer@rentride.com',
          phone: '+1 (212) 555-0144',
        },
        vehicle: JSON.parse(JSON.stringify(initialVehicles[0])), // Tesla Model S
        pickupDate: new Date(Date.now() - 86400000 * 2).toISOString(),
        returnDate: new Date(Date.now() + 86400000 * 2).toISOString(),
        pickupLocation: 'San Francisco Financial District',
        returnLocation: 'San Francisco Financial District',
        durationDays: 4,
        pricing: {
          baseDailyRate: 189,
          baseSubtotal: 756,
          durationDiscount: 37.8,
          surgeMultiplier: 1.0,
          peakSurcharge: 0,
          insurancePlan: 'Premium Full Coverage',
          insuranceCost: 116,
          addOnsCost: 40,
          loyaltyDiscount: 20,
          tax: 68.34,
          totalAmount: 922.54,
        },
        insurance: {
          plan: 'Premium Full Coverage',
          dailyFee: 29,
        },
        addOns: [
          { id: 'gps', name: 'Dedicated Satellite GPS', price: 20 },
          { id: 'toll_pass', name: 'FastTrak Toll Pass Pass-through', price: 20 },
        ],
        status: 'active',
        payment: {
          status: 'paid',
          method: 'credit_card',
          transactionId: 'TXN_TEST_99812903',
          paidAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          invoiceNumber: 'INV-2026-081',
          last4: '4242',
        },
        agreement: {
          signed: true,
          signatureDataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="60"><path d="M10,40 Q50,10 90,40 T170,25" fill="none" stroke="%2310b981" stroke-width="3"/></svg>',
          signedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          termsAccepted: true,
        },
        qrCode: 'VR-88210-VERIFIED-TOKEN',
        telematics: {
          currentLat: 37.795,
          currentLng: -122.408,
          speed: 48,
          fuelBatteryPercent: 79,
          status: 'In Transit / Moving',
        },
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
      {
        _id: 'bk_1002',
        bookingId: 'VR-77192',
        user: {
          _id: 'usr_customer',
          name: 'Sarah Connor',
          email: 'customer@rentride.com',
          phone: '+1 (212) 555-0144',
        },
        vehicle: JSON.parse(JSON.stringify(initialVehicles[2])), // Range Rover
        pickupDate: new Date(Date.now() + 86400000 * 5).toISOString(),
        returnDate: new Date(Date.now() + 86400000 * 8).toISOString(),
        pickupLocation: 'New York Central Park South',
        returnLocation: 'JFK Premier Airport Hub',
        durationDays: 3,
        pricing: {
          baseDailyRate: 240,
          baseSubtotal: 720,
          durationDiscount: 36,
          surgeMultiplier: 1.15,
          peakSurcharge: 108,
          insurancePlan: 'Standard Protection',
          insuranceCost: 57,
          addOnsCost: 15,
          loyaltyDiscount: 10,
          tax: 68.32,
          totalAmount: 902.32,
        },
        insurance: {
          plan: 'Standard Protection',
          dailyFee: 19,
        },
        addOns: [
          { id: 'additional_driver', name: 'Additional Certified Driver', price: 15 },
        ],
        status: 'confirmed',
        payment: {
          status: 'paid',
          method: 'apple_pay',
          transactionId: 'TXN_TEST_48102914',
          paidAt: new Date(Date.now() - 3600000 * 12).toISOString(),
          invoiceNumber: 'INV-2026-079',
          last4: '8831',
        },
        agreement: {
          signed: true,
          signatureDataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="60"><path d="M10,40 Q50,10 90,40 T170,25" fill="none" stroke="%2310b981" stroke-width="3"/></svg>',
          signedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
          termsAccepted: true,
        },
        qrCode: 'VR-77192-VERIFIED-TOKEN',
        telematics: {
          currentLat: 40.7644,
          currentLng: -73.9734,
          speed: 0,
          fuelBatteryPercent: 95,
          status: 'Reserved for Pickup',
        },
        createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      },
    ];
  }

  // User methods
  findUserByEmail(email) {
    return this.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id) {
    return this.users.find((u) => u._id === id);
  }

  createUser(userData) {
    const newUser = {
      _id: 'usr_' + Date.now(),
      ...userData,
      role: userData.role || 'customer',
      loyaltyPoints: 100, // 100 welcome bonus points
      loyaltyTier: 'Bronze',
      avatar: userData.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userData.name)}`,
      createdAt: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id, updates) {
    const idx = this.users.findIndex((u) => u._id === id);
    if (idx === -1) return null;
    this.users[idx] = { ...this.users[idx], ...updates };
    return this.users[idx];
  }

  // Vehicle methods
  getAllVehicles(filters = {}) {
    let result = [...this.vehicles];

    if (filters.category && filters.category !== 'All') {
      result = result.filter(
        (v) => v.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters.fuelType && filters.fuelType !== 'All') {
      result = result.filter(
        (v) => v.fuelType.toLowerCase() === filters.fuelType.toLowerCase()
      );
    }

    if (filters.transmission && filters.transmission !== 'All') {
      result = result.filter(
        (v) => v.transmission.toLowerCase() === filters.transmission.toLowerCase()
      );
    }

    if (filters.minPrice) {
      result = result.filter((v) => v.dailyRate >= Number(filters.minPrice));
    }

    if (filters.maxPrice) {
      result = result.filter((v) => v.dailyRate <= Number(filters.maxPrice));
    }

    if (filters.seats) {
      result = result.filter((v) => v.seats >= Number(filters.seats));
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.brand.toLowerCase().includes(q) ||
          v.model.toLowerCase().includes(q) ||
          v.location.city.toLowerCase().includes(q)
      );
    }

    if (filters.isAvailable !== undefined) {
      result = result.filter((v) => v.isAvailable === (filters.isAvailable === 'true' || filters.isAvailable === true));
    }

    return result;
  }

  getVehicleById(id) {
    return this.vehicles.find((v) => v._id === id);
  }

  createVehicle(vehicleData) {
    const newVehicle = {
      _id: 'veh_' + Date.now(),
      rating: 5.0,
      reviewCount: 1,
      isAvailable: true,
      maintenanceStatus: 'Normal',
      telematics: {
        currentLat: vehicleData.location?.lat || 37.7749,
        currentLng: vehicleData.location?.lng || -122.4194,
        speed: 0,
        fuelBatteryPercent: 100,
        status: 'Parked / Ready',
        heading: 0,
      },
      ...vehicleData,
    };
    this.vehicles.unshift(newVehicle);
    return newVehicle;
  }

  updateVehicle(id, updates) {
    const idx = this.vehicles.findIndex((v) => v._id === id);
    if (idx === -1) return null;
    this.vehicles[idx] = { ...this.vehicles[idx], ...updates };
    return this.vehicles[idx];
  }

  deleteVehicle(id) {
    const idx = this.vehicles.findIndex((v) => v._id === id);
    if (idx === -1) return false;
    this.vehicles.splice(idx, 1);
    return true;
  }

  // Booking methods
  getAllBookings() {
    return [...this.bookings].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  getBookingsByUserId(userId) {
    return this.bookings
      .filter((b) => b.user?._id === userId || b.user === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  getBookingById(id) {
    return this.bookings.find((b) => b._id === id || b.bookingId === id);
  }

  getBookingByQr(qrToken) {
    return this.bookings.find(
      (b) => b.qrCode === qrToken || b.bookingId === qrToken
    );
  }

  createBooking(bookingData) {
    const bookingId = 'VR-' + Math.floor(10000 + Math.random() * 90000);
    const invoiceNumber = 'INV-' + new Date().getFullYear() + '-' + Math.floor(100 + Math.random() * 900);

    const newBooking = {
      _id: 'bk_' + Date.now(),
      bookingId,
      status: 'confirmed',
      payment: {
        status: 'paid',
        invoiceNumber,
        paidAt: new Date().toISOString(),
        ...bookingData.payment,
      },
      qrCode: `${bookingId}-${Date.now().toString(36).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      ...bookingData,
    };

    this.bookings.unshift(newBooking);

    // Update vehicle availability if needed or mark telematics
    const veh = this.getVehicleById(bookingData.vehicle._id);
    if (veh) {
      veh.telematics = {
        ...veh.telematics,
        status: 'Reserved for Booking ' + bookingId,
      };
    }

    // Award loyalty points to user
    const user = this.findUserById(bookingData.user._id);
    if (user) {
      const earnedPoints = Math.round((bookingData.pricing.totalAmount || 100) * 0.1);
      user.loyaltyPoints = (user.loyaltyPoints || 0) + earnedPoints;
      // Upgrade tier if applicable
      if (user.loyaltyPoints >= 2000) user.loyaltyTier = 'Platinum';
      else if (user.loyaltyPoints >= 1000) user.loyaltyTier = 'Gold';
      else if (user.loyaltyPoints >= 500) user.loyaltyTier = 'Silver';
    }

    return newBooking;
  }

  updateBookingStatus(id, status) {
    const booking = this.getBookingById(id);
    if (!booking) return null;
    booking.status = status;

    const veh = this.getVehicleById(booking.vehicle?._id);
    if (veh) {
      if (status === 'active') {
        veh.telematics.status = 'On Road / In Trip';
        veh.isAvailable = false;
      } else if (status === 'completed' || status === 'cancelled') {
        veh.telematics.status = 'Parked / Ready';
        veh.isAvailable = true;
      }
    }

    return booking;
  }

  // Pricing config
  getPricingConfig() {
    return this.pricingConfig;
  }

  updatePricingConfig(updates) {
    this.pricingConfig = { ...this.pricingConfig, ...updates };
    return this.pricingConfig;
  }
}

export const store = new DataStore();

