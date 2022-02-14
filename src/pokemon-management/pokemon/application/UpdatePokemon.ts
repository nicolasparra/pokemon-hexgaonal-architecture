import Pokemon from "../domain/Pokemon";
import PokemonRepository from "../domain/Pokemon.repository";

export default class CreatePokemon {
  pokemonRepository: PokemonRepository;

  constructor(pokemonRepository: PokemonRepository) {
    this.pokemonRepository = pokemonRepository;
  }

  update = async (pokemon: Pokemon) => {
    try {
      const update = await this.pokemonRepository.update(pokemon);

      return update;
    } catch (err) {
      throw new Error(err.message);
    }
  };
}
