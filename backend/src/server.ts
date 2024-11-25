import http, { IncomingMessage, ServerResponse } from 'http';
import { Route } from './types/route';
import { routes } from './routes';

const server = http.createServer((request: IncomingMessage, response: ServerResponse) => {
  const { url, method } = request;

  console.log(`Request URL: ${url} - Method: ${method}`);
  
  const routeHandler = routes.find((route: Route) => route.match(request));
  if(routeHandler) {
    return routeHandler.handle(request, response);
  }

  response.statusCode = 404;
  response.end('Não encontrado');
});

server.listen(3001, () => {
  console.log('Server running at http://localhost:3001/');
});