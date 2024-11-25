import { IncomingMessage, ServerResponse } from "http"

export type Route = { 
  match:(request: IncomingMessage) => boolean;
  handle: (request: IncomingMessage, response: ServerResponse) => void;
};