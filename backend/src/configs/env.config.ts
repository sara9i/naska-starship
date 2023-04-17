import dotenv from "dotenv";

interface IEnvVars {
  port: string;
  mongoDbUrl: string;
}

class EnvVars implements IEnvVars {
  public port: string;
  public mongoDbUrl: string;

  constructor() {
    dotenv.config();
    this.port = this.getEnvVar("PORT");
    this.mongoDbUrl = this.getEnvVar("MONGO_DB_URL");
  }

  private getEnvVar(envVar: string): string {
    if (typeof process.env[envVar] !== "string") {
      console.error(`[error]: The ${envVar} environment variable is required`);
      process.exit(1);
    }
    return process.env[envVar];
  }
}

export default new EnvVars();
