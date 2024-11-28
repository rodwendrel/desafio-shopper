import express from 'express';
import bodyParser from 'body-parser';
import rideRoutes from './routes/ride.routes';
import driverRoutes from './routes/driver.routes';
import suggestionRoutes from './routes/suggestion.routes';

var cors = require('cors')

const app = express();

app.use(bodyParser.json());
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World');
})

app.use('/ride', rideRoutes);
app.use('/driver', driverRoutes);
app.use('/suggestion', suggestionRoutes);


app.listen(8080, () => {
  console.log('Servidor rodando! http://localhost:8080/ ');
})

export default app;