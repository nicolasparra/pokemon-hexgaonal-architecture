import Pokemon from "../../../pokemon-management/pokemon/domain/Pokemon";
import PokemonRepository from "../../../pokemon-management/pokemon/domain/Pokemon.repository";
import ProducerRepository from "../domain/IProducer";
import TrainerRepository from "../domain/Trainer.repository";
import { asyncForEach } from "../../../shared/utils/functions";

export default class EmitOpponents {
  producerRepository: ProducerRepository;
  trainerRepository: TrainerRepository;
  pokemonRepository: PokemonRepository

  constructor(
    producerRepository: ProducerRepository,
    trainerRepository: TrainerRepository,
    pokemonRepository: PokemonRepository
  ) {
    this.producerRepository = producerRepository;
    this.trainerRepository = trainerRepository;
    this.pokemonRepository = pokemonRepository;
  }

  emitOpponents = async (firstOpponent: string, secondOpponent: string, pokemonsFirstOpponent: [string], pokemonsSecondOpponent: [string]) => {
    try {
      const opponent1 = await this.trainerRepository.findById(firstOpponent);
      let pokemons1: Pokemon[] = [];
      const opponent2 = await this.trainerRepository.findById(secondOpponent);
      let pokemons2: Pokemon[] = [];

      await asyncForEach(pokemonsFirstOpponent, async (pkmn: string) => {
        pokemons1.push(await this.pokemonRepository.findById(pkmn))
      });
      await asyncForEach(pokemonsSecondOpponent, async (pkmn: string) => {
        pokemons2.push(await this.pokemonRepository.findById(pkmn))
      });

      const message = await this.producerRepository.emitOpponents({
        opponent1,
        pokemons1,
        opponent2,
        pokemons2,
      })
      return message;
    } catch (err) {
      throw new Error(err.message);
    }
  };
}
