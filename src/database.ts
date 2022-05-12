import mongoose from 'mongoose';
import 'dotenv/config';

class Database {
  db_url: string;
  db_name: string;

  constructor() {
    this.db_url = process.env.DATABASE_URL as string;
    this.db_name = process.env.DATABASE_NAME as string;
  }

  async start(): Promise<void> {
    try {
      mongoose.connect(this.db_url + '/' + this.db_name);
      console.log('Connected to database!');
    } catch {
      console.log('Database error');
    }
  }
}

export default Database;
