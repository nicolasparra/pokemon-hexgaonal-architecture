import { model, Schema } from "mongoose";

const MovementSchema: Schema = new Schema({
  idMovement: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  power: { type: Number, required: true },
  accuracy: { type: Number, required: true },
});

const Movement = model("Movement", MovementSchema);

export default Movement;
