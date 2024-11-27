import api from "../utils/axios";
import { GOOGLE_API_KEY, GEOCODE_URL } from "../utils/constants";

export class RideService {
   async estimate(origin: string, destination: string) {
    const { originData, destinationData } = await this.getCordinate(origin, destination);
    // const response = await api.post('/estimate', {
    //   id,
    //   origin: originData,
    //   destination: destinationData
    // });
    console.log(originData, destinationData);
  }
  
  async getCordinate(origin: string, destination: string) {
    const originResponse = await api.post(GEOCODE_URL + origin + '&key=' + GOOGLE_API_KEY);
    const destinationResponse = await api.post(GEOCODE_URL + destination + '&key=' + GOOGLE_API_KEY);
  
    const originData = originResponse.data.results[0].geometry.location;
    const destinationData = destinationResponse.data.results[0].geometry.location;
  
    return { originData, destinationData };
  }
}

