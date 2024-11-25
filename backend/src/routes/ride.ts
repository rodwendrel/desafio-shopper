import { Route } from "../types/route"
import { estimate } from "../controllers/rideController"

export const Ride: Route[] = [
  {
    match: (req) => req.url === '/ride/estimate' && req.method === 'GET',
    handle: estimate
  },
]