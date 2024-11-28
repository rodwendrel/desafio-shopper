
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

