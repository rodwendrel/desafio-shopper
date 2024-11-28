
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
export const GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
export const DIRECTIONS_URL = 'https://routes.googleapis.com/directions/v2:computeRoutes';
export const PLACES_URL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';

