import express from 'express';
import {
  previewPrice,
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  verifyQr,
} from '../controllers/bookingController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/preview-price', previewPrice);
router.post('/', protect, createBooking);
router.get('/my-bookings', protect, getMyBookings);
router.get('/verify/:token', verifyQr);
router.get('/:id', protect, getBookingById);
router.put('/:id/cancel', protect, cancelBooking);

export default router;

