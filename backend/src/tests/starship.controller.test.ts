/**
 * Required External Modules and Interfaces
 */

import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { click, stats } from "../controllers/startship.controller";
import { IStarShip } from "../interfaces/starship.interface";
import StarshipService from "../services/starship.service";
import StarShipValidator from "../validators/startship.validator";

/**
 * Mocks
 */


jest.mock("../services/starship.service");
jest.mock("../validators/startship.validator");

describe("Starship Controller", () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {
      body: {
        name: "Millennium Falcon",
        clicks: 0,
      },
    } as Request;

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      data: 'fake data',
    } as unknown as Response;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("click", () => {
    it("should create a new starship with a click count of 1 if it doesn't exist", async () => {
      const mockCreateStarShip = jest.spyOn(StarshipService, "createStarShip").mockResolvedValueOnce(undefined);
      const mockGetStarShipByName = jest.spyOn(StarshipService, "getStarShipByName").mockResolvedValueOnce(undefined);
      const mockUpdateStarShip = jest.spyOn(StarshipService, "updateStarShip");

      await click(req, res);

      expect(StarShipValidator.validate).toHaveBeenCalledWith(req.body);
      expect(mockGetStarShipByName).toHaveBeenCalledWith("Millennium Falcon");
      expect(mockUpdateStarShip).not.toHaveBeenCalled();
      expect(mockCreateStarShip).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.send).toHaveBeenCalledWith(await StarshipService.getAllStarShips());
    });

    it("should return updated starship list on successful click", async () => {
      const starshipModel = {
        name: "Y-wing"
      } as IStarShip;

      StarShipValidator.validate = jest.fn();
      StarshipService.getStarShipByName = jest.fn().mockResolvedValue(null);
      StarshipService.createStarShip = jest
        .fn()
        .mockResolvedValue(starshipModel);
      StarshipService.updateStarShip = jest
        .fn()
        .mockResolvedValue(starshipModel);
      StarshipService.getAllStarShips = jest
        .fn()
        .mockResolvedValue([starshipModel]);

      await click(req, res);

      expect(StarShipValidator.validate).toHaveBeenCalledWith(req.body);
      expect(StarshipService.getStarShipByName).toHaveBeenCalledWith(req.body.name);
      expect(StarshipService.createStarShip).toHaveBeenCalledWith(req.body);
      expect(StarshipService.getAllStarShips).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    });

    it("should send a bad request response if an error occurs", async () => {
      req.body.name = ""
      const error = new Error("Name is required");
      StarShipValidator.validate = jest.fn().mockImplementation(() => {
        throw error;
      });
      try
      {
        await click(req, res);
        expect(StarShipValidator.validate).toHaveBeenCalledWith(req.body);
      }catch(err){
        expect(err).toBeInstanceOf(Error);
        expect(err.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      }
    });
  });

  describe("stats", () => {
    it("should return a list of starships", async () => {
      const starships = [
        { clicks: 3, name: "Test Starship 1" },
        { clicks: 1, name: "Test Starship 2" }
      ];

      StarshipService.getAllStarShips = jest.fn().mockReturnValue(starships);

      await stats(null, res);

      expect(StarshipService.getAllStarShips).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.send).toHaveBeenCalledWith(starships);
    });

    it("should return an error if there was a problem getting the starships", async () => {
      const mockError = new Error("Failed to get starships");

      jest.spyOn(StarshipService, "getAllStarShips").mockRejectedValue(mockError);

      const mockReq = {} as Request;
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      } as unknown as Response;

      await stats(mockReq, mockRes);

      expect(StarshipService.getAllStarShips).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      expect(mockRes.send).toHaveBeenCalledWith(mockError.message);
    });
  });
});
