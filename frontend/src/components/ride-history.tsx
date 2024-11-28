import { useEffect, useState } from "react";
import api from "@/utils/axios";

interface Ride {
  id: number;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  value: number;
  driver: {
    id: number;
    name: string;
  };
}

interface Driver {
  id: number;
  name: string;
}

interface RideHistoryProps {
  customer_id: string;
}

export default function RideHistory({ customer_id: initialCustomerId }: RideHistoryProps) {
  const [customerId, setCustomerId] = useState<string>(initialCustomerId); 
  const [driverId, setDriverId] = useState<string | undefined>(""); 
  const [rides, setRides] = useState<Ride[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]); 

  const fetchDrivers = async () => {
    try {
      const response = await api.get("/driver/getAll"); 
      setDrivers(response.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message = error.response.data.error_description;
    alert(message);
  }
  };

  const fetchRides = async () => {
    if (!customerId) {
      alert("O Id do usuário é obrigatório.");
      return;
    }
    try {
      const params = driverId ? { driver_id: driverId } : {}; 
      const response = await api.get(`/ride/${customerId}`, { params });
      setRides(response.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message = error.response.data.error_description;
    alert(message);
  }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const formatValueInBRL = (value: number) => {
    const roundedValue = Number(value).toFixed(2);
    return Number(roundedValue).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };


  return (
    <div className="mt-5 ">
      <h2 className="font-bold text-xl">Histórico de Corridas</h2>

      <div className="mb-5 flex items-center">
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="customer_id">ID do Usuário:</label>
            <input
              id="customer_id"
              type="text"
              value={customerId} 
              onChange={(e) => setCustomerId(e.target.value)}
              className="border rounded-md p-1"
            />
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="driver_id">Selecione o Motorista:</label>
            <select
              id="driver_id"
              value={driverId}
              onChange={(e) => setDriverId(e.target.value || undefined)} 
              className="border rounded-md p-1"
            >
              <option value="">Todos os motoristas</option>
              {drivers.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={fetchRides}
            className="bg-blue-600 rounded-md p-2 flex items-center justify-center text-white hover:bg-blue-700"
          >
            Aplicar Filtro
          </button>
        </div>
      </div>

      {rides.length > 0 ? (
        <ul>
          {rides.map((ride) => (
            <li key={ride.id} className="border rounded-md p-2 mb-2">
              <p><strong>Origem:</strong> {ride.origin}</p>
              <p><strong>Destino:</strong> {ride.destination}</p>
              <p><strong>Distância:</strong> {ride.distance} km</p>
              <p><strong>Duração:</strong> {ride.duration}</p>
              <p><strong>Valor:</strong> {formatValueInBRL(ride.value)}</p>
              <p><strong>Motorista:</strong> {ride.driver.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma corrida encontrada.</p>
      )}
    </div>
  );
}
