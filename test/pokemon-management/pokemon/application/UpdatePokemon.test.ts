const { describe } = require("mocha");

import chai from "chai";
import Pokemon from "../../../../src/pokemon-management/pokemon/domain/Pokemon";
const { expect } = chai;

import CreatePokemon from "../../../../src/pokemon-management/pokemon/application/CreatePokemon"
import PokemonRepositoryTest from "../infrastructure/Pokemon.repository.test";
import MovementRepositoryTest from "../../movement/infrastructure/Movement.repository.test";
import Type from "../../../../src/shared/domain/Type";
import CreateMovement from "../../../../src/pokemon-management/movement/application/CreateMovement";
import Movement from "../../../../src/pokemon-management/movement/domain/Movement";
import UpdatePokemon from "../../../../src/pokemon-management/pokemon/application/UpdatePokemon"

describe("Application Layer - Update Pokemon", async () => {
    const pokemonRepositoryTest = new PokemonRepositoryTest()
    const movementRepositoryTest = new MovementRepositoryTest()
    const createPokemon = new CreatePokemon(pokemonRepositoryTest, movementRepositoryTest)
    const updatePokemon = new UpdatePokemon(pokemonRepositoryTest)
    const createMovement = new CreateMovement(movementRepositoryTest)
    const movement = new Movement({ name: "Test", type: Type.BUG, accuracy: 100, power: 80 })
    const createdMovement = await createMovement.create(movement);
    const pokemon = new Pokemon({ name: "Test", type: Type.BUG, attack: 100, defense: 100, health: 100, movements: [movement.idMovement] })

    it("Should update a Pokemon in Moongoose", async () => {
        const createdPokemon = await createPokemon.create(pokemon)
        const pokemonToUpdate = new Pokemon({ name: "Updated Pokemon", type: Type.BUG, attack: 100, defense: 100, health: 100, movements: [movement.idMovement] })
        pokemonToUpdate.idPokemon = pokemon.idPokemon;
        const updatedPokemon = await updatePokemon.update(pokemonToUpdate);


        expect(updatedPokemon).to.be.a("object");
        expect(updatedPokemon.idPokemon).to.equal(pokemon.idPokemon);
        expect(updatedPokemon.name).to.equal("Updated Pokemon");

    })
})