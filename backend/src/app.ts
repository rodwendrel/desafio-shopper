import express from 'express';
import bodyParser from 'body-parser';
import rideRoutes from './routes/ride.routes';
import driverRoutes from './routes/driver.routes';

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.use('/ride', rideRoutes);
app.use('/driver', driverRoutes);


app.listen(8080, () => {
  console.log('Server running at http://localhost:8080/ ');
})

export default app;