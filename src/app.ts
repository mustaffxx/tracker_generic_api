import express, { Application } from 'express';
import cors from 'cors';
import auth from './routes/AuthRoute';
import users from './routes/UserRoute';
import vehicles from './routes/VehicleRoute';
import devices from './routes/DeviceRoute';
import 'dotenv/config';

class App {
  server: Application;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares(): void {
    this.server.use(express.json());
    this.server.use(cors({ exposedHeaders: 'x-access-token' }));
  }

  routes(): void {
    this.server.use(auth);
    this.server.use(users);
    this.server.use(vehicles);
    this.server.use(devices);
  }

  start(): void {
    const port: number = parseInt(process.env.PORT as string, 10) || 3000;
    this.server.listen(port, () => {
      console.log(`Server running at port ${port}`);
    });
  }
}

export default App;
