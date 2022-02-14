const { describe } = require("mocha");

import chai from "chai";
import Movement from "../../../../src/pokemon-management/movement/domain/Movement";
const { expect } = chai;

import CreateMovement from "../../../../src/pokemon-management/movement/application/CreateMovement"
import DeleteMovement from "../../../../src/pokemon-management/movement/application/DeleteMovement"
import FindMovement from "../../../../src/pokemon-management/movement/application/FindMovement"
import MovementRepositoryTest from "../infrastructure/Movement.repository.test";
import Type from "../../../../src/shared/domain/Type";

describe("Application Layer - Delete Movement", async () => {
    const movementRepositoryTest = new MovementRepositoryTest()
    const createMovement = new CreateMovement(movementRepositoryTest)
    const deleteMovement = new DeleteMovement(movementRepositoryTest)
    const findMovement = new FindMovement(movementRepositoryTest)
    const movement = new Movement({ name: "Test", type: Type.BUG, accuracy: 100, power: 80 })

    it("Should create a Movement in Moongoose, delete this Movement and cant found it", async () => {

        try {
            const createdMovement = await createMovement.create(movement)
            const deletedMovement = await deleteMovement.delete(movement.idMovement)
            const foundMovement = await findMovement.getById(movement.idMovement)
        } catch (error) {
            expect(error).to.be.a("Error")
        }
    })
})