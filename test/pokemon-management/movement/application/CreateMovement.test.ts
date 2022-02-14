const { describe } = require("mocha");

import chai from "chai";
import Movement from "../../../../src/pokemon-management/movement/domain/Movement";
const { expect } = chai;

import CreateMovement from "../../../../src/pokemon-management/movement/application/CreateMovement"
import MovementRepositoryTest from "../infrastructure/Movement.repository.test";
import Type from "../../../../src/shared/domain/Type";

describe("Application Layer - Create Movement", async () => {
    const movementRepositoryTest = new MovementRepositoryTest()
    const createMovement = new CreateMovement(movementRepositoryTest)
    const movement = new Movement({ name: "Test", type: Type.BUG, accuracy: 100, power: 80 })

    it("Should create a Movement in Moongoose", async () => {
        const createdMovement = await createMovement.create(movement)

        expect(createdMovement).to.be.a("object");
        expect(createdMovement).to.have.property("_id")

    })
})