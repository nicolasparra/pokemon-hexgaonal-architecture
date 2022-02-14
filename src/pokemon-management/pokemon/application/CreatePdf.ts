import PokemonRepository from "../domain/Pokemon.repository";

export default class CreatePdf {
  pokemonRepository: PokemonRepository;

  constructor(pokemonRepository: PokemonRepository) {
    this.pokemonRepository = pokemonRepository;
  }

  createPdfBuffer = async (id: string) => {
    try {
      const buffer = await this.pokemonRepository.getPdfBuffer(id);

      return buffer;
    } catch (err) {
      throw new Error(err.message);
    }
  };
}
