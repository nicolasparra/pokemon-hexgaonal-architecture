const { describe } = require("mocha");

import chai from "chai";

import Trainer from "../../../../src/trainer-management/trainer/domain/Trainer";

const { expect } = chai;

import CreateTrainer from "../../../../src/trainer-management/trainer/application/CreateTrainer"
import FindTrainer from "../../../../src/trainer-management/trainer/application/FindTrainer"
import TrainerRepositoryTest from "../infrastructure/Trainer.repository.test";
import PokemonRepositoryTest from "../../pokemon/infrastructure/Pokemon.repository.test";
import Gender from "../../../../src/shared/domain/Gender";


describe("Application Layer - Find Trainer ", async () => {
    const trainerRepositoryTest = new TrainerRepositoryTest()
    const pokemonRepositoryTest = new PokemonRepositoryTest()
    const createTrainer = new CreateTrainer(trainerRepositoryTest, pokemonRepositoryTest)
    const findTrainer = new FindTrainer(trainerRepositoryTest)
    const trainer = new Trainer({name: "Test",gender : Gender.Male, password: "Password"})

    it("should create Trainer in Moongoose and found all", async function () {
        const trainer1 = new Trainer({name: "Trainer1",gender : Gender.Male, password: "Password"})
        const trainer2 = new Trainer({name: "Trainer2",gender : Gender.Male, password: "Password"})
        const trainer3 = new Trainer({name: "Trainer3",gender : Gender.Male, password: "Password"})

        await createTrainer.create(trainer1);
        await createTrainer.create(trainer2);
        await createTrainer.create(trainer3);

        const foundTrainers = await findTrainer.getAll();

        expect(foundTrainers[0].idTrainer).to.equal(trainer1.idTrainer);
        expect(foundTrainers[1].idTrainer).to.equal(trainer2.idTrainer);
        expect(foundTrainers[2].idTrainer).to.equal(trainer3.idTrainer);

    });

    it("should create a Trainer in Moongoose and found a this Trainer by Id ", async function () {
        await createTrainer.create(trainer);
        const foundTrainer = await findTrainer.getById(trainer.idTrainer);

        expect(foundTrainer).to.be.a("object")
        expect(foundTrainer.idTrainer).to.equal(trainer.idTrainer);

    });

});