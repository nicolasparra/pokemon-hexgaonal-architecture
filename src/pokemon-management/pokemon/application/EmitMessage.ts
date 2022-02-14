import ProducesRepository from "../domain/IProducer";
import PokemonRepository from "../domain/Pokemon.repository";

export default class EmitMessage {
  producesRepository: ProducesRepository;
  pokemonRepository: PokemonRepository;

  constructor(
    producesRepository: ProducesRepository,
    pokemonRepository: PokemonRepository
  ) {
    this.producesRepository = producesRepository;
    this.pokemonRepository = pokemonRepository;
  }

  emitBattle = async (firstPokemon: string, secondPokemon: string) => {
    try {
      const fPokemon = await this.pokemonRepository.findById(firstPokemon);
      const sPokemon = await this.pokemonRepository.findById(secondPokemon);
      const message = await this.producesRepository.emitBattle(
        fPokemon,
        sPokemon
      );
      return message;
    } catch (err) {
      throw new Error(err.message);
    }
  };
}
