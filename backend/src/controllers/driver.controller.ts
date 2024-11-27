import { Request, Response } from "express";
import { DriverService } from "../services/driver.service";

const driverService = new DriverService();

export class DriverController {
  async fetchDrivers(req: Request, res: Response) {
    const { distance } = req.query;
    const response = await driverService.fetchDrivers(+(distance || 0));
    res.send(response);
  }
}