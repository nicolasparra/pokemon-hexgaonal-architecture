import PokemonRepository from "../domain/Pokemon.repository";

export default class CreatePokemon {
    pokemonRepository: PokemonRepository;

    constructor(pokemonRepository: PokemonRepository) {
        this.pokemonRepository = pokemonRepository;
    }

    delete = async (id: string) => {
        try {
            const deleted = await this.pokemonRepository.delete(id);
            return deleted;
        } catch (err) {
            throw new Error(err.message);
        }
    };
}