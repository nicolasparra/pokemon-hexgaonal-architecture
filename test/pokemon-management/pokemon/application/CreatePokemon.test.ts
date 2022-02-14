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

describe("Application Layer - Create Pokemon", async () => {
    const pokemonRepositoryTest = new PokemonRepositoryTest()
    const movementRepositoryTest = new MovementRepositoryTest()
    const createPokemon = new CreatePokemon(pokemonRepositoryTest, movementRepositoryTest)
    const createMovement = new CreateMovement(movementRepositoryTest)
    const movement = new Movement({ name: "Test", type: Type.BUG, accuracy: 100, power: 80 })
    const createdMovement = await createMovement.create(movement);
    const pokemon = new Pokemon({ name: "Test", type: Type.BUG, attack: 100, defense: 100, health: 100, movements: [movement.idMovement] })
    const pokemonFail = new Pokemon({ name: "Test", type: Type.BUG, attack: 100, defense: 100, health: 100, movements: ["movementFail"] })

    it("Should create a Pokemon in Moongoose", async () => {
        const createdPokemon = await createPokemon.create(pokemon)

        expect(createdPokemon).to.be.a("object");
        expect(createdPokemon).to.have.property("_id")

    })
    it("Should return an Error for invalid  Movement", async () => {
        try {
            const createdPokemon = await createPokemon.create(pokemonFail)
        } catch (error) {
            expect(error).to.be.a("Error")
        }

    })
})