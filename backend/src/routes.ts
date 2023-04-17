import { Express } from "express";
import * as SwapiController from "./controllers/swapi.controller";
/**
 * Required External Modules and Interfaces
 */

import { Request, Response } from "express";
import * as startshipController from "./controllers/startship.controller";

export function routes(app: Express) {
  app.get("/", (req, res) => {
    return res.send("Service is up and running");
  });

  app.get("/wing-starships", async (req: Request, res: Response) => {
    SwapiController.starshipsWithWings(req, res);
  });

  app.post("/click", async (req: Request, res: Response) => {
    startshipController.click(req, res);
  });
  
  app.get("/stats", async (req: Request, res: Response) => {
    startshipController.stats(req, res);
  });
}
