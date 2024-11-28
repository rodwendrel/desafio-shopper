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
        const rideValue = (distance / 1000) * parseFloat(driver.value.toString()); 
        const review = JSON.stringify(driver.review);
        return {
          id: driver.id,
          name: driver.name,
          description: driver.description,
          vehicle: driver.vehicle,
          review: JSON.parse(review),
          value: rideValue,
        }
      });

      driverWithValue.sort((a, b) => a.value - b.value);

      if(driverWithValue.length === 0) {
        return null;
      }

      return driverWithValue;

    } catch (error) {
      console.error(error);
    }
  }

  /* Retorna todos os motoristas */
  async fetchAllDrivers() {
    try {
      const allDrivers = await db.select().from(drivers);
      return allDrivers;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /* Verifica se o motorista é válido */
  private async verifyValidDriver(driverId: number, res: Response) {
    try {
      const driver = await db.select().from(drivers).where(eq(drivers.id, driverId));
      if(driver.length === 0) {
        errorHandler(res, 404, "Os dados fornecidos no corpo da requisição são inválidos", "INVALID_DRIVER");
        return false; // Motorista não encontrado
      }
      return driver[0]; // Retorna o motorista se encontrado
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /* Verifica se a distância é válida para o motorista */
  private verifyValidDistance(driver: any, distance: number, res: Response) {
    if(driver.min_distance > distance) {
      errorHandler(res, 406, "Quilometragem inválida para o motorista", "INVALID_DISTANCE");
      return false; // Distância inválida
    }
    return true; // Distância válida
  }

  /* Função principal para verificar se o motorista e a distância são válidos */
  async verifyDriver(driverId: number, distance: number, res: Response) {
    const driver = await this.verifyValidDriver(driverId, res);
    if (!driver) return; // Se o motorista não for válido, retorna

    const isValidDistance = this.verifyValidDistance(driver, distance, res);
    if (!isValidDistance) return; // Se a distância não for válida, retorna

    return true; // Motorista e distância válidos
  }
}
