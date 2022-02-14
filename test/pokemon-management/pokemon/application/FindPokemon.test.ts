const { describe } = require("mocha");

import chai from "chai";

import Pokemon from "../../../../src/pokemon-management/pokemon/domain/Pokemon";

const { expect } = chai;

import CreatePokemon from "../../../../src/pokemon-management/pokemon/application/CreatePokemon"
import FindPokemon from "../../../../src/pokemon-management/pokemon/application/FindPokemon"
import PokemonRepositoryTest from "../infrastructure/Pokemon.repository.test";
import MovementRepositoryTest from "../../movement/infrastructure/Movement.repository.test";
import Type from "../../../../src/shared/domain/Type";


describe("Application Layer - Find Pokemon ", async () => {
    const pokemonRepositoryTest = new PokemonRepositoryTest()
    const movementRepositoryTest = new MovementRepositoryTest()
    const createPokemon = new CreatePokemon(pokemonRepositoryTest, movementRepositoryTest)
    const findPokemon = new FindPokemon(pokemonRepositoryTest)
    const pokemon = new Pokemon({ name: "Test", type: Type.BUG, attack: 100, defense: 100, health: 100 })

    it("should create Pokemon in Moongoose and found all", async function () {
        const pokemon1 = new Pokemon({ name: "Test", type: Type.BUG, attack: 100, defense: 100, health: 100 })
        const pokemon2 = new Pokemon({ name: "Test", type: Type.BUG, attack: 100, defense: 100, health: 100 })
        const pokemon3 = new Pokemon({ name: "Test", type: Type.BUG, attack: 100, defense: 100, health: 100 })

        await createPokemon.create(pokemon1);
        await createPokemon.create(pokemon2);
        await createPokemon.create(pokemon3);

        const foundPokemons = await findPokemon.getAll();

        expect(foundPokemons[0].idPokemon).to.equal(pokemon1.idPokemon);
        expect(foundPokemons[1].idPokemon).to.equal(pokemon2.idPokemon);
        expect(foundPokemons[2].idPokemon).to.equal(pokemon3.idPokemon);

    });

    it("should create a Pokemon in Moongoose and found a this Pokemon by Id ", async function () {
        const createdPokemon = await createPokemon.create(pokemon);
        const foundPokemon = await findPokemon.getById(pokemon.idPokemon);

        expect(foundPokemon).to.be.a("object")
        expect(foundPokemon.idPokemon).to.equal(pokemon.idPokemon);

    });

});