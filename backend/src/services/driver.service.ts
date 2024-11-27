import { db } from "../db/client";
import { drivers } from "../db/schema";
import { lte, eq } from "drizzle-orm";
import { errorHandler } from "../utils/error.handling";
import { Response } from "express";

export class DriverService {

  /* Retorna lista de motorista baseado na distância e do menor para o maior preço */
  async fetchDrivers(distance: number) {
    try {
      const avaliableDrivers = await db.select().from(drivers).where(lte(drivers.min_distance, distance));
      
      const driverWithValue = avaliableDrivers.map(driver => {
        // const distanceInKm = distance / 1000;
        const rideValue = distance * parseFloat(driver.value.toString());
        const review = JSON.stringify(driver.review);
        return {
          id: driver.id,
          name: driver.name,
          description: driver.description,
          vehicle: driver.vehicle,
          review: JSON.parse(review),
          value: rideValue,
        }
      })

      driverWithValue.sort((a, b) => a.value - b.value);

      if(driverWithValue.length === 0) {
        return null;
      }

      return driverWithValue;
      
    } catch (error) {
      console.error(error);
    }
  }

  async verifyDriver(driverId: number, distance: number, res: Response) {
    try {
      const driver = await db.select().from(drivers).where(eq(drivers.id, driverId));
      if(driver.length === 0) {
        errorHandler(res, 404, "Os dados fornecidos no corpo da requisição são inválidos", "INVALID_DRIVER");
        return;
      }

      if(driver[0].min_distance > distance) {
        errorHandler(res, 406, "Quilometragem inválida para o motorista", "INVALID_DISTANCE");
        return;
      }

      return true;
    } catch (error) {
      console.error(error);
    }
  }
}