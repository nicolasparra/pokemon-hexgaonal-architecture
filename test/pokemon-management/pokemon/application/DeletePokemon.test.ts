const { describe } = require("mocha");

import chai from "chai";
import Pokemon from "../../../../src/pokemon-management/pokemon/domain/Pokemon";
const { expect } = chai;

import CreatePokemon from "../../../../src/pokemon-management/pokemon/application/CreatePokemon"
import DeletePokemon from "../../../../src/pokemon-management/pokemon/application/DeletePokemon"
import FindPokemon from "../../../../src/pokemon-management/pokemon/application/FindPokemon"
import PokemonRepositoryTest from "../infrastructure/Pokemon.repository.test";
import MovementRepositoryTest from "../../movement/infrastructure/Movement.repository.test";
import Type from "../../../../src/shared/domain/Type";

describe("Application Layer - Delete Pokemon", async () => {
    const pokemonRepositoryTest = new PokemonRepositoryTest()
    const movementRepositoryTest = new MovementRepositoryTest()
    const deletePokemon = new DeletePokemon(pokemonRepositoryTest)
    const findPokemon = new FindPokemon(pokemonRepositoryTest)
    const createPokemon = new CreatePokemon(pokemonRepositoryTest, movementRepositoryTest)
    const pokemon = new Pokemon({ name: "Test", type: Type.BUG, attack: 100, defense: 100, health: 100 })

    it("Should create a Pokemon in Moongoose, delete this Pokemon and cant found it", async () => {

        try {
            const createdPokemon = await createPokemon.create(pokemon)
            const deletedPokemon = await deletePokemon.delete(pokemon.idPokemon)
            const foundPokemon = await findPokemon.getById(pokemon.idPokemon)
        } catch (error) {
            expect(error).to.be.a("Error")
        }
    })
})