import { model, Schema } from "mongoose";

const PokemonSchema: Schema = new Schema({
  idPokemon: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  attack: { type: Number, required: true },
  defense: { type: Number, required: true },
  health: { type: Number, required: true },
  movements: {
    type: Array,
    required: false,
    validate: [arrayLimit, "{PATH} exceeds the limit of 4"],
  },
  filePath: { type: String, required: false },
});

function arrayLimit(val) {
  return val.length <= 4;
}

const Pokemon = model("Pokemon", PokemonSchema);

export default Pokemon;
