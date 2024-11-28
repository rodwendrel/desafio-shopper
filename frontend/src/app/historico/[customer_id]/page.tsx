
'use client'
import RideHistory from "@/components/ride-history";
import { useParams } from "next/navigation";

export default function RideHistoryPage() {
  const { customer_id } = useParams() as { customer_id: string };

  return (
    <div>
      <h1>Ride History Page {customer_id}</h1>
      <RideHistory customer_id={customer_id} />
    </div>
  );
}