import { IStarShip } from "../interfaces/starship.interface";

class StarShipValidator {
  static validate(data: IStarShip): void {
    const { name } = data;
    if (!name) {
      throw new Error("Name is required");
    }
  }
}

export default StarShipValidator;
