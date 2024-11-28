import { GOOGLE_API_KEY } from "@/utils/constants";
import Image from "next/image";

interface StaticMapProps {
  originLat: number;
  originLng: number;
  destinationLat: number;
  destinationLng: number;
  encodedPolyline: string;
  size?: string; 
}

const StaticMap: React.FC<StaticMapProps> = ({
  originLat,
  originLng,
  destinationLat,
  destinationLng,
  encodedPolyline,
  size = "640x480",
}) => {
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=${size}&markers=color:red%7Clabel:O%7C${originLat},${originLng}&markers=color:blue%7Clabel:D%7C${destinationLat},${destinationLng}&path=enc:${encodedPolyline}&key=${GOOGLE_API_KEY}`;

  console.log(GOOGLE_API_KEY)
  return (
    <div className="flex justify-center items-center p-4 bg-gray-100 rounded-lg shadow-md">
      <Image
        src={mapUrl}
        alt="Mapa estático entre origem e destino"
        layout="intrinsic"
        width={500}
        height={500}
      />
    </div>
  );
};

export default StaticMap;
