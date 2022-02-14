import Pokemon from "./Pokemon"

export default class Opponent {
    private _id: string
    private _name: string
    private _pokemons: Pokemon[]

    constructor(id: string, name: string, pokemons: Pokemon[]) {
        this._id = id
        this._name = name
        this._pokemons = pokemons
    }

    public get id(): string {
        return this._id;
    }

    public set id(id: string) {
        this._id = id;
    }

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public get pokemons(): Pokemon[] {
        return this._pokemons;
    }

    public set pokemons(pokemons: Pokemon[]) {
        this._pokemons = pokemons;
    }

}