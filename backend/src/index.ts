/**
 * Required External Modules
 */

import express from "express";
// import * as swaggerUi from "swagger-ui-express";
// import * as swaggerDocument from "../docs/swagger.json";
import { rateLimit } from "./middleware/rate-limit.middleware";
import { routes } from "./routes";

import cors, { CorsOptions } from 'cors';
import helmet from "helmet";
import Database from "./configs/db.config";
import EnvVars from "./configs/env.config";

 
 const app = express();

/**
 *  App Configuration
 */

app.use(express.json());
app.use(rateLimit);


// //adding swagger ui
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));




app.use(helmet());
app.use(express.json());

const isAllowedOrigin = (origin: string, callback: (err: Error | null, allow?: boolean) => void) => {
  // Add your origin validation logic here
  const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
  const isAllowed = allowedOrigins.includes(origin);

  if (!isAllowed) {
    return callback(new Error('Not allowed by CORS'));
  }

  return callback(null, true);
};

const corsOptions: CorsOptions = {
  origin: isAllowedOrigin,
};

app.use(cors(corsOptions));

routes( app);
Database.connect();

/**
 * Server Activation
 */

app.listen(EnvVars.port, () => {
  console.log(`Application listening at http://localhost:${EnvVars.port || 8000}`);
});
