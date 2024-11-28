'use client'
import { useState } from "react";
import { Driver } from "@/types/driver.type";
import api from "@/utils/axios";
import RideHistory from "@/components/ride-history";

interface ListDriversProps {
  drivers: Driver[];
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
}

export default function ListDrivers({ drivers, customer_id, origin, destination, distance, duration }: ListDriversProps) {
  const [rideConfirmed, setRideConfirmed] = useState(false);

  const formatValueInBRL = (value: number) => {
    const roundedValue = value.toFixed(2);
    return Number(roundedValue).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const confirmDrive = async (driver: Driver) => {
    const data = {
      customer_id,
      origin,
      destination,
      distance,
      duration,
      driver: {
        id: driver.id,
        name: driver.name
      },
      value: driver.value
    };

    try {
      const response = await api.patch('/ride/confirm', data);
      console.log(response.data);
      alert('Corrida confirmada com sucesso!');
      window.location.replace("/historico/" + customer_id);
      setRideConfirmed(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message = error.response.data.error_description;
    alert(message);
  }
  };

  return (
    <div>
      <div className="flex gap-5 mt-5">
        {drivers.map((driver) => (
          <div key={driver.id} className="border rounded-md p-2">
            <h2 className="font-bold text-xl">{driver.name}</h2>
            <p>{driver.description}</p>
            <span className="font-bold">Veículo:</span>
            <p>{driver.vehicle}</p>
            <span className="font-bold">Avaliações:</span>
            <p>{driver.review.rating} / 5</p>
            <p>{driver.review.comment}</p>
            <p>Valor da viagem: {formatValueInBRL(driver.value)}</p>
            <button onClick={() => confirmDrive(driver)} className="mt-2 p-2 bg-blue-500 text-white rounded">Confirmar Corrida</button>
          </div>
        ))}
      </div>
      {rideConfirmed && <RideHistory customer_id={customer_id} />}
    </div>
  )
}
