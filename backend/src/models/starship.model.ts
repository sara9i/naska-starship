import { model, Schema, Model, Document } from "mongoose";

export interface IStarShipModel extends Document {
  name: string;
  model?: string;
  clicks?: Number;
  createDate: Date;
  updatedDate: Date;
  timestamps?: {};
}

const StarShipSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  model: { type: String },
  clicks: { type: Number, default: 0 },
  createDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  timestamps: { createDate: Date, updatedDate: Date },
});

export const StarShipModel: Model<IStarShipModel> = model<IStarShipModel>(
  "StarShip",
  StarShipSchema
);
