import mongoose, { ConnectOptions } from "mongoose";
import EnvVars from "./env.config";

class Database {
  private url: string;

  constructor() {
    this.url = EnvVars.mongoDbUrl;
  }

  public connect(): void {
    try {
      mongoose.connect(this.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions);
      console.log(`Successfully connected to the database`);
    } catch (error) {
      console.error(`Error connecting to the database: ${error}`);
      process.exit(1);
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log(`Successfully disconnected from the database`);
    } catch (error) {
      console.error(`Error disconnecting from the database: ${error}`);
    }
  }
}

export default new Database();
