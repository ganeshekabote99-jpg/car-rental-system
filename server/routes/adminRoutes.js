import express from 'express';
import {
  getAnalytics,
  getAllBookings,
  updateBookingStatus,
  getPricingConfig,
  updatePricingConfig,
} from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// All admin routes protected
router.use(protect, adminOnly);

router.get('/analytics', getAnalytics);
router.get('/bookings', getAllBookings);
router.put('/bookings/:id/status', updateBookingStatus);
router.get('/pricing-config', getPricingConfig);
router.put('/pricing-config', updatePricingConfig);

export default router;

