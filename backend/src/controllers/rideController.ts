import { IncomingMessage, ServerResponse } from 'http';

export const estimate = (req: IncomingMessage, res: ServerResponse) => {
  res.statusCode = 200;
  res.end('Estimate ride');
}