import express from 'express';
import {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  toggleMaintenance,
} from '../controllers/vehicleController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getVehicles);
router.get('/:id', getVehicleById);

// Admin-only endpoints
router.post('/', protect, adminOnly, createVehicle);
router.put('/:id', protect, adminOnly, updateVehicle);
router.delete('/:id', protect, adminOnly, deleteVehicle);
router.post('/:id/maintenance', protect, adminOnly, toggleMaintenance);

export default router;

