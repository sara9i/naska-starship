import { IStarShip } from "../interfaces/starship.interface";
import { StarShipModel, IStarShipModel } from "../models/starship.model";

class StarshipService {
  static createStarShip = async (data: IStarShip): Promise<IStarShipModel> => {
    try {
      return await StarShipModel.create(data);
    } catch (error) {
      throw new Error(`Unable to create starship: ${error.message}`);
    }
  };

  static updateStarShip = async (
    name: string
  ): Promise<IStarShipModel | null> => {
    try {
      return await StarShipModel.findOneAndUpdate(
        { name },
        { $inc: { clicks: 1 } },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Unable to update starship: ${error.message}`);
    }
  };

  static getStarShipByName = async (
    name: string
  ): Promise<IStarShipModel | null> => {
    try {
      return await StarShipModel.findOne({ name });
    } catch (error) {
      throw new Error(`Unable to find starship: ${error.message}`);
    }
  };

  static getAllStarShips = async (): Promise<IStarShipModel[]> => {
    try {
      return await StarShipModel.find();
    } catch (error) {
      throw new Error(`Unable to get starships: ${error.message}`);
    }
  };
}

export default StarshipService;
