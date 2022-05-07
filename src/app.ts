import express, { Application } from 'express';
import cors from 'cors';
import routes from './routes';
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
    this.server.use(cors());
  }

  routes(): void {
    this.server.use(routes);
  }

  start(): void {
    const port: number = parseInt(process.env.PORT || '', 10) || 3000;
    this.server.listen(port, () => {
      console.log(`Server running at port ${port}`);
    });
  }
}

export default App;
