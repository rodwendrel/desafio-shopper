import { Driver } from "./driver.type";

export type Ride = {
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: Driver;
  value: number;
}