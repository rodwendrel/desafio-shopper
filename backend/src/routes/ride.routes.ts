import { Router } from 'express';
import { RideController } from '../controllers/ride.controller';

const router = Router();
const rideController = new RideController();

router.post('/estimate', rideController.estimate);
router.patch('/confirm', rideController.confirm);
router.get('/:customer_id', rideController.getRide);

export default router;

