/**
 * Required External Modules and Interfaces
 */

import { Request, Response } from "express";

import { StatusCodes } from 'http-status-codes';
import { IStarShip } from "../interfaces/starship.interface";
import StarshipService from "../services/starship.service";
import StarShipValidator from "../validators/startship.validator";

export const click = async (req: Request, res: Response) => {
  try {
    const starShip: IStarShip = req.body;
    // Validate the starship data using the validator
    StarShipValidator.validate(starShip);
    const { name } = starShip;

    // Check if the starship already exists
    const exists = await StarshipService.getStarShipByName(name);

    // If the starship exists, update its click count
    // Otherwise, create a new starship with a click count of 1
    const message = exists
      ? await StarshipService.updateStarShip(name)
      : ((starShip.clicks = 1), await StarshipService.createStarShip(starShip));

    // Return a success response with the updated starship list
    return res.status(StatusCodes.OK).send(await StarshipService.getAllStarShips());
  } catch (error) {
    // If an error occurs, return a bad request response with the error message
    return res.status(StatusCodes.BAD_REQUEST).send(error.message);
  }
}

/**
 * Controller Definitions
 */

export const stats = async (req: Request, res: Response) => {
  try {
    const starShips = await StarshipService.getAllStarShips();
    res.status(StatusCodes.OK).send(starShips);
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).send(e.message);
  }
}