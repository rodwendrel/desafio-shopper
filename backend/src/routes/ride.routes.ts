import { Router } from 'express';
import { RideController } from '../controllers/ride.controller';

const router = Router();
const rideController = new RideController();

router.post('/estimate', rideController.estimate);

export default router;

