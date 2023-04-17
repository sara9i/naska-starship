import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import SwapiService from "../services/swapi.service";


export const starshipsWithWings = async (req: Request, res: Response) => {
  try {
    // filter out to get only the starships containing `wing` in their name
    const swapiServiceObj = new SwapiService("wing");
    const wingStarShips = await swapiServiceObj.starships();
    // Return a success response with the starship with wings list
    return res.status(StatusCodes.OK).send(wingStarShips);
    
  } catch (error) {
    // If an error occurs, return a bad request response with the error message
    return res.status(StatusCodes.BAD_REQUEST).send(error.message);
  }
}
