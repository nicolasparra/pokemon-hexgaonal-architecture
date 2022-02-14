const { describe } = require("mocha");

import chai from "chai";
import Movement from "../../../../src/pokemon-management/movement/domain/Movement";
const { expect } = chai;

import CreateMovement from "../../../../src/pokemon-management/movement/application/CreateMovement";
import UpdateMovement from "../../../../src/pokemon-management/movement/application/UpdateMovement"
import MovementRepositoryTest from "../infrastructure/Movement.repository.test";
import Type from "../../../../src/shared/domain/Type";

describe("Application Layer - Update Movement", async () => {
    const movementRepositoryTest = new MovementRepositoryTest()
    const createMovement = new CreateMovement(movementRepositoryTest)
    const updateMovement = new UpdateMovement(movementRepositoryTest)
    const movement = new Movement({ name: "Test", type: Type.BUG, accuracy: 100, power: 80 })

    it("Should Update a Movements in Moongoose", async () => {
        const createdMovement = await createMovement.create(movement);
        const movementToUpdate = new Movement({ name: "Test", type: Type.BUG, accuracy: 50, power: 80 })
        movementToUpdate.idMovement = movement.idMovement;
        const updatedMovement = await updateMovement.update(movementToUpdate);


        expect(updatedMovement).to.be.a("object");
        expect(updatedMovement.idMovement).to.equal(movement.idMovement);
        expect(updatedMovement.accuracy).to.equal(50);

    })
})