import express, { Application } from "express";
import routes from './routes';

class App {
    server: Application;

    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares(): void {
        this.server.use(express.json());
    }

    routes(): void {
        this.server.use(routes);
    }
}

export default new App().server;