import { Router } from "express";
import { DriverController } from "../controllers/driver.controller";

const router = Router()
const driverController = new DriverController();

router.get('/get', driverController.fetchDrivers)

export default router;