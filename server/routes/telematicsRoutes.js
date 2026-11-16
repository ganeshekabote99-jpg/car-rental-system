import express from 'express';
import { getVehicleTelematics } from '../controllers/telematicsController.js';

const router = express.Router();

router.get('/:vehicleId', getVehicleTelematics);

export default router;

