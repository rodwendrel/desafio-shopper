import { Request, Response } from 'express';
import { RideService } from '../services/ride.service';

const rideService = new RideService();

export class RideController {

  async estimate(req: Request, res: Response): Promise<void> {
    const { customer_id, origin, destination } = req.body;
    await rideService.estimate(customer_id, origin, destination, res);
  }

  async confirm(req: Request, res: Response): Promise<void> {
    const { customer_id, origin, distance, destination, duration, driver, value } = req.body;

    await rideService.confirm({
      customer_id,
      origin,
      distance,
      destination,
      duration,
      driver,
      value,
    }, res);
  }
  
  async getRide(req: Request, res: Response): Promise<void> {
    const { customer_id } = req.params;
    const { driver_id } = req.query;
    const response = await rideService.getRide(customer_id, res, typeof driver_id === 'string' ? driver_id : undefined);
    res.send(response);
  }
}