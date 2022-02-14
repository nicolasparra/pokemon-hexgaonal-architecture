const { describe } = require("mocha");

import chai from "chai";
import Trainer from "../../../../src/trainer-management/trainer/domain/Trainer";
const { expect } = chai;

import DeleteTrainer from "../../../../src/trainer-management/trainer/application/DeleteTrainer"
import FindTrainer from "../../../../src/trainer-management/trainer/application/FindTrainer"
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
    const deleteTrainer = new DeleteTrainer(trainerRepositoryTest)
    const findTrainer = new FindTrainer(trainerRepositoryTest)
    const createTrainer = new CreateTrainer(trainerRepositoryTest,pokemonRepositoryTest)
    const createPokemon = new CreatePokemon(pokemonRepositoryTest,movementRepositoryTest)
    const createMovement = new CreateMovement(movementRepositoryTest)
    const movement = new Movement({ name: "MovementTest", type: Type.BUG, accuracy: 100, power: 80 })
    await createMovement.create(movement);
    const pokemon = new Pokemon({ name: "PokemonTest", type: Type.BUG, attack: 100, defense: 100, health: 100, movements: [movement.idMovement] })
    await createPokemon.create(pokemon);
    const trainer = new Trainer({name: "TrainerTest",gender : Gender.Male, password: "Password",pokemons:[pokemon.idPokemon]})

    it("Should create a Pokemon in Moongoose, delete this Pokemon and cant found it", async () => {

        try {
            await createTrainer.create(trainer)
            await deleteTrainer.delete(trainer.idTrainer)
            await findTrainer.getById(trainer.idTrainer)
        } catch (error) {
            expect(error).to.be.a("Error")
        }
    })
})
