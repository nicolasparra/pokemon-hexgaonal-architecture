const { describe } = require("mocha");
import chai from "chai";
const { expect } = chai;
import Trainer from "../../../../src/Trainer-management/trainer/domain/Trainer";
import Name from "../../../../src/shared/domain/Name"
import Gender from "../../../../src/shared/domain/Gender"
import Password from "../../../../src/shared/domain/Password"
describe("Domain layer - Trainer", async () => {

    it("Should return error for invalid Name", async () => {
        try {
            const name = new Name("")
        } catch (error) {
            expect(error).to.be.a("Error")
        }
    })
    it("Should return error for invalid Gender", async () => {
        try {
            let genderTest: any
            const trainer = new Trainer({name: "Test",gender : genderTest, password: "Password"})
        } catch (error) {
            expect(error).to.be.a("Error")
        }
    })

    it("Should return error for invalid Password", async () => {
        try {
            const password = new Password("")
        } catch (error) {
            expect(error).to.be.a("Error")
        }
    })
    it("Should return invalid Id", async () => {

        try {
            const trainer = new Trainer({name: "Test",gender : Gender.Male, password: "Password"})
            trainer.idTrainer = "fail"
        } catch (error) {
            expect(error).to.be.a("Error")
        }
    })
    it("Should return invalid Pokemon", async () => {

        try {
            const trainer = new Trainer({name: "Test",gender : Gender.Male, password: "Password",pokemons:["falsePokemon"]})
        } catch (error) {
            expect(error).to.be.a("Error")
        }
    })
    it("Should return valid Trainer", async () => {
        const trainer = new Trainer({name: "Test",gender : Gender.Male, password: "Password"})

        expect(trainer.name.value).to.equal("Test")
        expect(trainer.gender).to.equal("Male")
        expect(trainer.password.value).to.equal("Password")
        trainer.password.generatePasswordEncrypted();
        trainer.password.comparePassword(trainer.password.value);

    })

})