import { FindMovement } from "../../movement/application";
import Pokemon from "../domain/Pokemon";
import PokemonRepository from "../domain/Pokemon.repository";
import MovementRepository from "../../movement/domain/Movement.repository";
import { asyncForEach } from "../../../shared/utils/functions";

export default class CreatePokemon {
  pokemonRepository: PokemonRepository;
  movementRepository: MovementRepository;
  findMovement: FindMovement;

  constructor(
    pokemonRepository: PokemonRepository,
    movementRepository: MovementRepository
  ) {
    this.pokemonRepository = pokemonRepository;
    this.movementRepository = movementRepository;
    this.findMovement = new FindMovement(this.movementRepository);
  }

  create = async (pokemon: Pokemon) => {
    try {
      await asyncForEach(pokemon.movements, async (e) => {
        const result = await this.findMovement.getById(e);
        if (!result) {
          throw new Error("Movement not found");
        }
      });
      const created = await this.pokemonRepository.create(pokemon);

      return created;
    } catch (err) {
      throw new Error(err.message);
    }
  };
}
