import axios from 'axios';
import { GOOGLE_API_KEY, PLACES_URL } from '../utils/constants';

export class SuggestionsService {
  async fetchSuggestions(query: string) {
    try {
      const response = await axios.get(PLACES_URL, {
        params: {
          input: query,
          key: GOOGLE_API_KEY,
          types: ["address", "establishment", "geocode"],
          components: "country:br",
          language: "pt-BR",
        },
      });
      return response.data.predictions || [];
    } catch (error) {
      console.error("Erro ao buscar sugestões:", error);
      throw error;
    }
  }
}