import express from 'express';
import rideRoutes from './routes/ride.routes';

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.use('/ride', rideRoutes);

app.listen(port, () => {
  console.log('Server running at http://localhost:8080/ ');
})

export default app;