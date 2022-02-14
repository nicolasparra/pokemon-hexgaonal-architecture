import { model, Schema } from "mongoose";

const TrainerSchema: Schema = new Schema({
  idTrainer: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  gender: { type: String, required: true },
  password: { type: String, required: true, select: false },
  pokemons: {
    type: Array,
    required: false,
    validate: [arrayLimit, "{PATH} exceeds the limit of 6"],
  },
});

function arrayLimit(val) {
  return val.length <= 6;
}

const Trainer = model("Trainer", TrainerSchema);

export default Trainer;
