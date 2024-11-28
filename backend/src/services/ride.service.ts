import api from "../utils/axios";
import { Response } from "express";
import { errorHandler } from "../utils/error.handling";
import { DriverService } from "./driver.service";
import { db } from "../db/client";
import { GOOGLE_API_KEY, GEOCODE_URL, DIRECTIONS_URL } from "../utils/constants";
import { rides } from "../db/schema";
import { Ride } from "../types/ride.type";
import { eq, and, sql } from "drizzle-orm";

const driverService = new DriverService();
export class RideService {
  /* Método para estimar as informações da corrida */
   async estimate(customer_id: string, origin: string, destination: string, res: Response) {
    /* Trativas de erro */
    if(!customer_id) {
      errorHandler(res, 400, "Os dados fornecidos no corpo da requisição são inválidos");
      return
    }

    if(!origin || !destination) {
      errorHandler(res, 400, "Os dados fornecidos no corpo da requisição são inválidos");
      return
    }

    if(origin === destination) {
      errorHandler(res, 400, "Os dados fornecidos no corpo da requisição são inválidos");
      return
    }

    const coordinates = await this.getCordinate(origin, destination, res);
    if (!coordinates) return;
    const { originData, destinationData } = coordinates;

    const ride = await this.getRideData(originData, destinationData);
    const drivers = await driverService.fetchDrivers(ride.distance);

    if(!drivers) {
      errorHandler(res, 400, "Os dados fornecidos no corpo da requisição são inválidos");
      return;
    }

    res.status(200).send({ 
      descrição: "Opereção realizada com sucesso!",
      resposta: {
        origin: {
          latitude: originData.lat,
          longitude: originData.lng
        },
        destination: {
          latitude: destinationData.lat,
          longitude: destinationData.lng
        },
        distance: ride.distance,
        duration: ride.duration,
        options: drivers,
        routeResponse: JSON.parse(ride.original)
      
      }
    })
  }
  
  /* Método para buscar as coordenadas de origem e destino */
  async getCordinate(origin: string, destination: string, res: Response) {
    const originResponse = await api.post(GEOCODE_URL + origin + '&key=' + GOOGLE_API_KEY);
    const destinationResponse = await api.post(GEOCODE_URL + destination + '&key=' + GOOGLE_API_KEY);

    if(originResponse.data.status === 'ZERO_RESULTS' || destinationResponse.data.status === 'ZERO_RESULTS') {
      return errorHandler(res, 400, "Insira um endereço válido!");
    }

    const originData = originResponse.data.results[0].geometry.location;
    const destinationData = destinationResponse.data.results[0].geometry.location;

  
    return { originData, destinationData };
  }

  /* Método para calcular a distância entre origem e destino */
  async getRideData(origin: any, destination: any) {

    const data = JSON.stringify({
      "origin":{
        "location":{
          "latLng":{
            "latitude": origin.lat,
            "longitude": origin.lng
          }
        }
      },
      "destination":{
        "location":{
          "latLng":{
            "latitude": destination.lat,
            "longitude": destination.lng
          }
        }
      }
    })

    const config = {
      method: 'post',
      url: DIRECTIONS_URL,
      maxBodyLength: Infinity,
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_API_KEY,
        'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline',
      },
      data : data
    }

    const response = await api.request(config);
    return {distance: response.data.routes[0].distanceMeters, duration: response.data.routes[0].duration, original: JSON.stringify(response.data)};
  }

  /* Método para confirmar a corrida */
  async confirm({ customer_id, origin, distance, destination, duration, driver, value }: Ride, res: Response) {
    // Validação dos parâmetros obrigatórios
    if (!origin || !destination) {
      errorHandler(res, 400, "Os endereços de origem e destino não podem estar em branco!");
      return;
    }

    if (!customer_id) {
      errorHandler(res, 400, "O Id do usuário não pode estar em branco!");
      return;
    }

    if (origin === destination) {
      errorHandler(res, 400, "Os endereços de origem e destino não podem ser iguais!");
      return;
    }

    if (!driver) {
      errorHandler(res, 404, "Uma opção de motorista deve ser informada!", "DRIVER_NOT_FOUND");
      return;
    }

    const verifyDriver = await driverService.verifyDriver(driver.id, distance, res);
    if (!verifyDriver) {
      return; 
    }

    // Inserir a corrida no banco de dados
    try {
      await db.insert(rides).values({
        customer_id,
        origin,
        destination,
        duration: duration.toString(),
        driver: { id: driver.id, name: driver.name },
        value: value.toString(),
      });
      res.status(200).send({
        description: "Operação realizada com sucesso!",
        success: true,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        description: "Erro ao realizar a operação.",
        success: false,
      });
    }
  }

  async getRide(customer_id: string, res: Response, driver_id?: string) {

    console.log(driver_id)
    if(!customer_id) {
      errorHandler(res, 400, "Os dados fornecidos no corpo da requisição são inválidos");
      return;
    }

    try {
      const ride = await db.select().from(rides).where(
        and(
          driver_id ? eq(sql`rides.driver->>'id'`, driver_id) : undefined,
          eq(rides.customer_id, customer_id)
        ),
      );

   
  
      return ride;
    } catch (error) {
      console.log(error)
    }

  }
}

