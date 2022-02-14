const { describe } = require("mocha");

import chai from "chai";
import Movement from "../../../../src/pokemon-management/movement/domain/Movement";
const { expect } = chai;

import CreateMovement from "../../../../src/pokemon-management/movement/application/CreateMovement"
import FindMovement from "../../../../src/pokemon-management/movement/application/FindMovement"
import MovementRepositoryTest from "../infrastructure/Movement.repository.test";
import Type from "../../../../src/shared/domain/Type";

describe("Application Layer - Find Movements ", async () => {
    const movementRepositoryTest = new MovementRepositoryTest()
    const createMovement = new CreateMovement(movementRepositoryTest)
    const findMovement = new FindMovement(movementRepositoryTest)
    const movement = new Movement({ name: "Test", type: Type.BUG, accuracy: 100, power: 80 })

    it("should create Movements in Moongoose and found all", async function () {
        const movement1 = new Movement({ name: "Test1", type: Type.BUG, accuracy: 100, power: 80 })
        const movement2 = new Movement({ name: "Test2", type: Type.BUG, accuracy: 100, power: 80 })
        const movement3 = new Movement({ name: "Test3", type: Type.BUG, accuracy: 100, power: 80 })

        await createMovement.create(movement1);
        await createMovement.create(movement2);
        await createMovement.create(movement3);

        const foundMovements = await findMovement.getAll();

        expect(foundMovements[0].idMovement).to.equal(movement1.idMovement);
        expect(foundMovements[1].idMovement).to.equal(movement2.idMovement);
        expect(foundMovements[2].idMovement).to.equal(movement3.idMovement);

    });

    it("should create a Movement in Moongoose and found a this movement by Id ", async function () {
        const createdMovement = await createMovement.create(movement);
        const foundMovement = await findMovement.getById(movement.idMovement);

        expect(foundMovement).to.be.a("object")
        expect(foundMovement.idMovement).to.equal(movement.idMovement);

    });

});