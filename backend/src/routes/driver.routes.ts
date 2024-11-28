import { Router } from "express";
import { DriverController } from "../controllers/driver.controller";

const router = Router()
const driverController = new DriverController();

router.get('/get', driverController.fetchDrivers)
router.get('/getAll', driverController.fetchAllDrivers)

export default router;