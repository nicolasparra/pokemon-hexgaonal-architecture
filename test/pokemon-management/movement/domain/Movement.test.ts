const { describe } = require("mocha");
import chai from "chai";
const { expect } = chai;
import Name from "../../../../src/shared/domain/Name"
import Type from "../../../../src/shared/domain/Type"
import Movement from "../../../../src/pokemon-management/movement/domain/Movement"
import Accuracy from "../../../../src/pokemon-management/movement/domain/value_objects/Accuracy"
import Power from "../../../../src/pokemon-management/movement/domain/value_objects/Power"
describe("Domain layer - Movement", async () => {

    it("Should return error for invalid Accuracy", async () => {
        try {
            const accuracy = new Accuracy("")
        } catch (error) {
            expect(error).to.be.a("Error")
        }
    })
    it("Should return error for invalid Power", async () => {
        try {
            const power = new Power("")
        } catch (error) {
            expect(error).to.be.a("Error")
        }
    })
    it("Should return error for invalid Name", async () => {
        try {
            const name = new Name("")
        } catch (error) {
            expect(error).to.be.a("Error")
        }
    })
    it("Should return error for invalid Type", async () => {
        try {
            let typeTest: any
            const movement = new Movement({ name: "name", type: typeTest, accuracy: 100, power: 100 });
        } catch (error) {
            expect(error).to.be.a("Error")
        }
    })
    it("Should return invalid Id", async () => {

        try {
            const movement = new Movement({ name: "Test", type: Type.FIRE, accuracy: 100, power: 100 });
            movement.idMovement = "fail"
        } catch (error) {
            expect(error).to.be.a("Error")
        }
    })
    it("Should return valid Movement", async () => {
        const movement = new Movement({ name: "Test", type: Type.FIRE, accuracy: 100, power: 100 });

        expect(movement.name.value).to.equal("Test")
        expect(movement.type).to.equal("Fire")
        expect(movement.accuracy.value).to.equal(100)
        expect(movement.power.value).to.equal(100)

    })

})