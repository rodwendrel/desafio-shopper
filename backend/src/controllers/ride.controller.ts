import { Request, Response, } from 'express';
import { RideService } from '../services/ride.service';

const rideService = new RideService();

export class RideController {
  // constructor() {
  //   this.estimate = this.estimate.bind(this);
  // }

  async estimate(req: Request, res: Response) {
    console.log(req.body)
    // const { origin, destination } = req.body;
    // const response = await rideService.estimate(origin, destination);
    // res.send(response);
  }
  
}