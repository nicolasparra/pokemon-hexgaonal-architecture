import Pokemon from "../../../../src/pokemon-management/pokemon/domain/Pokemon"
import IPokemon from "../../../../src/pokemon-management/pokemon/domain/Pokemon.repository"
import PokemonSchema from "../../../../src/pokemon-management/pokemon/infrastructure/repositories/Pokemon.schema"

export default class PokemonRepositoryTest implements IPokemon {
    getPdfBuffer(id: string): Promise<Buffer> {
        throw new Error("Method not implemented.");
    }
    dataSchema: Pokemon[] = [];
    dataObject: Pokemon[] = [];

    async findById(id: string): Promise<Pokemon> {
        try {

            const pokemon = await this.dataObject.find((pokemon) => pokemon.idPokemon == id)

            if (!pokemon) {
                throw new Error("Error on find by id.")
            }
            return pokemon

        } catch (error) {

        }
    }
    async findAll(): Promise<Pokemon[]> {
        return this.dataSchema
    }
    async create(pokemon: Pokemon): Promise<void> {
        const pokemonJson = pokemon.toJSON();
        const pokemonToSave = new PokemonSchema(pokemonJson)

        this.dataObject.push(pokemon)
        this.dataSchema.push(pokemonToSave)
        return pokemonToSave

    }
    async delete(id: string): Promise<void> {

        this.dataSchema.map(element => {
            if (element.idPokemon != id) {
                return element
            }
        })
        this.dataObject.map(element => {
            if (element.idPokemon != id) {
                return element
            }
        })


    }
    async update(pokemon: Pokemon): Promise<Pokemon> {

        this.delete(pokemon.idPokemon)
        pokemon.idPokemon = pokemon.idPokemon
        const pokemonJson = pokemon.toJSON();
        const pokemonToSave = new PokemonSchema(pokemonJson)

        this.dataObject.push(pokemon)
        this.dataSchema.push(pokemonToSave)


        return pokemonToSave
    }

}