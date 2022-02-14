const { describe } = require("mocha");
import chai from "chai";
const { expect } = chai;
import Name from "../../../../src/shared/domain/Name"
import Type from "../../../../src/shared/domain/Type"
import Attack from "../../../../src/pokemon-management/pokemon/domain/value_objects/Attack";
import Defense from "../../../../src/pokemon-management/pokemon/domain/value_objects/Defense";
import Health from "../../../../src/pokemon-management/pokemon/domain/value_objects/Health";
import Pokemon from "../../../../src/pokemon-management/pokemon/domain/Pokemon";
describe("Domain layer - Pokemon", async () => {

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
            const pokemon = new Pokemon({ name: "Test", type: typeTest, attack: 100, defense: 100, health: 100 });
        } catch (error) {
            expect(error).to.be.a("Error")
        }
    })

    it("Should return error for invalid Attack", async () => {
        try {
            const attack = new Attack("")
        } catch (error) {
            expect(error).to.be.a("Error")
        }
    })
    it("Should return error for invalid Attack", async () => {
        try {
            const attack = new Attack(undefined)
        } catch (error) {
            expect(error).to.be.a("Error")
        }
    })
    it("Should return error for invalid Defense", async () => {
        try {
            const defense = new Defense("")
        } catch (error) {
            expect(error).to.be.a("Error")
        }
    })
    it("Should return error for invalid Health", async () => {
        try {
            const health = new Health("")
        } catch (error) {
            expect(error).to.be.a("Error")
        }
    })

    it("Should return invalid Id", async () => {

        try {
            const pokemon = new Pokemon({ name: "Test", type: Type.FIRE, attack: 100, defense: 100, health: 100 });
            pokemon.idPokemon = "fail"
        } catch (error) {
            expect(error).to.be.a("Error")
        }
    })
    it("Should return invalid Movement", async () => {

        try {
            const pokemon = new Pokemon({ name: "Test", type: Type.FIRE, attack: 100, defense: 100, health: 100, movements: ["falseMovement"] });
        } catch (error) {
            expect(error).to.be.a("Error")
        }
    })
    it("Should return valid Pokemon", async () => {
        const pokemon = new Pokemon({ name: "Test", type: Type.FIRE, attack: 100, defense: 100, health: 100 });

        expect(pokemon.name.value).to.equal("Test")
        expect(pokemon.type).to.equal("Fire")
        expect(pokemon.attack.value).to.equal(100)
        expect(pokemon.defense.value).to.equal(100)
        expect(pokemon.health.value).to.equal(100)

    })

})