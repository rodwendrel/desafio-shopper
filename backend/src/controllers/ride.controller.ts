import { Request, Response, } from 'express';
import { RideService } from '../services/ride.service';
import { Ride } from '../types/ride.type';

const rideService = new RideService();

export class RideController {

  async estimate(req: Request, res: Response) {
    const { customer_id, origin, destination } = req.body;
    const response = await rideService.estimate(customer_id, origin, destination, res);
    res.send(response);
  }

  async confirm(req: Request, res: Response) {
    const { customer_id, origin, distance, destination, duration, driver, value } = req.body;

    const response = await rideService.confirm({
      customer_id,
      origin,
      distance,
      destination,
      duration,
      driver,
      value,
    }, res);
    res.send(response);
  }
  
  async getRide(req: Request, res: Response) {
    const { customer_id } = req.params;
    const response = await rideService.getRide(customer_id, res);
    res.send(response);
  }
}