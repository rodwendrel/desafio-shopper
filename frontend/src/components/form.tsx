import { useState } from "react";
import AutoInput from "./auto-input";
import ListDrivers from "./list-drivers";
import StaticMap from "./map";
import api from "@/utils/axios";

export default function Form() {
  const [customer_id, setCostumer_id] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState("");
  interface MapData {
    originLat: number;
    originLng: number;
    destinationLat: number;
    destinationLng: number;
    encodedPolyline: string;
  }
  
  const [mapData, setMapData] = useState<MapData | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.post("/ride/estimate", {
        customer_id,
        origin,
        destination,
      });

      
      const { origin: originCoords, destination: destinationCoords, routeResponse } = response.data.resposta;
      const encodedPolyline = routeResponse.routes[0].polyline.encodedPolyline;
      setMapData({
        originLat: originCoords.latitude,
        originLng: originCoords.longitude,
        destinationLat: destinationCoords.latitude,
        destinationLng: destinationCoords.longitude,
        encodedPolyline,
      });
      setDrivers(response.data.resposta.options); 
      setDistance(routeResponse.routes[0].distance);
      setDuration(routeResponse.routes[0].duration);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message = error.response.data.error_description;
      alert(message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-1/2">
        <div className="flex flex-col">
          <label>Id de usuário</label>
          <input
            type="text"
            value={customer_id}
            placeholder="Digite o id do usuário"
            className="border border-gray-300 rounded-md p-1"
            onChange={(e) => setCostumer_id(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label>Origem:</label>
          <AutoInput onSelect={setOrigin} />
        </div>
        <div className="flex flex-col">
          <label>Destino:</label>
          <AutoInput onSelect={setDestination} />
        </div>
        <button
          className="bg-blue-600 rounded-md p-2 flex items-center justify-center text-white hover:bg-blue-700"
          type="submit"
        >
          Enviar
        </button>
      </form>
      {mapData && (
        <StaticMap
          originLat={mapData.originLat}
          originLng={mapData.originLng}
          destinationLat={mapData.destinationLat}
          destinationLng={mapData.destinationLng}
          encodedPolyline={mapData.encodedPolyline}
        />
      )}
      <ListDrivers 
        drivers={drivers}
        customer_id={customer_id}
        origin={origin}
        destination={destination}
        distance={distance}
        duration={duration}
      />
    </>
  );
}
