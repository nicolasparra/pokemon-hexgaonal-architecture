const { describe } = require("mocha");

import chai from "chai";
import Trainer from "../../../../src/trainer-management/trainer/domain/Trainer";
const { expect } = chai;

import CreateTrainer from "../../../../src/trainer-management/trainer/application/CreateTrainer"
import TrainerRepositoryTest from "../infrastructure/Trainer.repository.test";
import PokemonRepositoryTest from "../../pokemon/infrastructure/Pokemon.repository.test";
import Type from "../../../../src/shared/domain/Type";
import CreatePokemon from "../../../../src/pokemon-management/pokemon/application/CreatePokemon";
import Pokemon from "../../../../src/pokemon-management/pokemon/domain/Pokemon";
import MovementRepositoryTest from "../../movement/infrastructure/Movement.repository.test";
import CreateMovement from "../../../../src/pokemon-management/movement/application/CreateMovement";
import Movement from "../../../../src/pokemon-management/movement/domain/Movement";
import Gender from "../../../../src/shared/domain/Gender";


describe("Application Layer - Create Trainer", async () => {
    const trainerRepositoryTest = new TrainerRepositoryTest()
    const pokemonRepositoryTest = new PokemonRepositoryTest()
    const movementRepositoryTest = new MovementRepositoryTest()
    const createTrainer = new CreateTrainer(trainerRepositoryTest,pokemonRepositoryTest)
    const createPokemon = new CreatePokemon(pokemonRepositoryTest,movementRepositoryTest)
    const createMovement = new CreateMovement(movementRepositoryTest)
    const movement = new Movement({ name: "MovementTest", type: Type.BUG, accuracy: 100, power: 80 })
    await createMovement.create(movement);
    const pokemon = new Pokemon({ name: "PokemonTest", type: Type.BUG, attack: 100, defense: 100, health: 100, movements: [movement.idMovement] })
    await createPokemon.create(pokemon);
    const trainer = new Trainer({name: "TrainerTest",gender : Gender.Male, password: "Password",pokemons:[pokemon.idPokemon]})
    const trainerFail = new Trainer({name: "TrainerTest",gender : Gender.Male, password: "Password",pokemons:["falsePokemon"]})

    it("Should create a Trainer in Moongoose", async () => {
        const createdTrainer = await createTrainer.create(trainer)

        expect(createdTrainer).to.be.a("object");
        expect(createdTrainer).to.have.property("_id")

    })
    it("Should return an Error for invalid  Pokemon", async () => {
        try {
            const createdTrainer = await createTrainer.create(trainerFail)
        } catch (error) {
            expect(error).to.be.a("Error")
        }

    })
})