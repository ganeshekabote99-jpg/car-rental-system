import { store } from '../data/store.js';

export const getAnalytics = async (req, res) => {
  try {
    const vehicles = store.getAllVehicles();
    const bookings = store.getAllBookings();

    const totalFleet = vehicles.length;
    const availableVehicles = vehicles.filter((v) => v.isAvailable && v.maintenanceStatus === 'Normal').length;
    const underMaintenance = vehicles.filter((v) => v.maintenanceStatus !== 'Normal').length;

    const activeRentals = bookings.filter((b) => b.status === 'active').length;
    const confirmedBookings = bookings.filter((b) => b.status === 'confirmed').length;
    const completedBookings = bookings.filter((b) => b.status === 'completed').length;
    const cancelledBookings = bookings.filter((b) => b.status === 'cancelled').length;

    const totalRevenue = bookings
      .filter((b) => b.payment.status === 'paid')
      .reduce((sum, b) => sum + (b.pricing?.totalAmount || 0), 0);

    const fleetUtilization = totalFleet > 0 ? Math.round(((totalFleet - availableVehicles) / totalFleet) * 100) : 0;

    // Revenue by category breakdown
    const categoryRevenue = {};
    bookings.forEach((b) => {
      const cat = b.vehicle?.category || 'Other';
      categoryRevenue[cat] = (categoryRevenue[cat] || 0) + (b.pricing?.totalAmount || 0);
    });

    return res.json({
      metrics: {
        totalFleet,
        availableVehicles,
        underMaintenance,
        activeRentals,
        confirmedBookings,
        completedBookings,
        cancelledBookings,
        totalRevenue: parseFloat(totalRevenue.toFixed(2)),
        fleetUtilization,
        totalRegisteredUsers: store.users.length,
      },
      categoryRevenue,
      recentBookings: bookings.slice(0, 8),
      fleetStatusList: vehicles.map((v) => ({
        _id: v._id,
        name: v.name,
        plate: v.registrationPlate,
        status: v.isAvailable ? (v.maintenanceStatus === 'Normal' ? 'Available' : 'Maintenance') : 'Rented / Busy',
        batteryFuel: v.telematics.fuelBatteryPercent,
        location: v.location.city,
      })),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = store.getAllBookings();
    return res.json({
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['confirmed', 'active', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updated = store.updateBookingStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    return res.json({
      message: `Booking status updated to ${status}`,
      booking: updated,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPricingConfig = async (req, res) => {
  try {
    const config = store.getPricingConfig();
    return res.json(config);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePricingConfig = async (req, res) => {
  try {
    const updated = store.updatePricingConfig(req.body);
    return res.json({
      message: 'Pricing configuration updated successfully',
      config: updated,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

