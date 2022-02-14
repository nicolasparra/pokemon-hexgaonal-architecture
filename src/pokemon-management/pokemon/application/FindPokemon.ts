import PokemonRepository from "../domain/Pokemon.repository";

export default class CreatePokemon {
  pokemonRepository: PokemonRepository;

  constructor(pokemonRepository: PokemonRepository) {
    this.pokemonRepository = pokemonRepository;
  }

  getAll = async () => {
    try {
      const pokemonAll = await this.pokemonRepository.findAll();

      return pokemonAll;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  getById = async (id: string) => {
    try {
      const pokemonAll = await this.pokemonRepository.findById(id);

      return pokemonAll;
    } catch (err) {
      throw new Error(err.message);
    }
  };
}
