import Trainer from "../domain/Trainer";
import TrainerRepository from "../domain/Trainer.repository";
import PokemonRepository from "./../../../pokemon-management/pokemon/domain/Pokemon.repository";
import FindPokemon from "./../../../pokemon-management/pokemon/application/FindPokemon";
import { asyncForEach } from "../../../shared/utils/functions";

export default class CreateTrainer {
  trainerRepository: TrainerRepository;
  pokemonRepository: PokemonRepository;
  findPokemon: FindPokemon;

  constructor(
    trainerRepository: TrainerRepository,
    pokemonRepository: PokemonRepository
  ) {
    this.trainerRepository = trainerRepository,
      this.pokemonRepository = pokemonRepository
    this.findPokemon = new FindPokemon(this.pokemonRepository)
  }

  create = async (trainer: Trainer) => {
    try {
      await asyncForEach(trainer.pokemons, async (e) => {
        const result = await this.findPokemon.getById(e);
        if (!result) {
          throw new Error("Movement not found");
        }
      });
      const created = await this.trainerRepository.create(trainer);

      return created;
    } catch (err) {
      throw new Error(err.message);
    }
  };
}