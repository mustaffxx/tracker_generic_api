import App from './app';
import Database from './database';

const database = new Database();
database.start();

const app = new App();
app.start();
