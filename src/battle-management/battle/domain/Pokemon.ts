import Movement from "./Movement"

export default class Pokemon {

    private _name: string
    private _type: string
    private _defenseIndex: Number
    private _healthPoints: Number
    private _movements: Movement[]

    constructor(
        name: string,
        type: string,
        defenseIndex: Number,
        healthPoints: Number,
        movements: Movement[]
    ) {
        this._name = name
        this._type = type
        this._defenseIndex = defenseIndex
        this._healthPoints = healthPoints
        this._movements = movements
    }

    public get name(): string {
        return this._name;
    }

    public get type(): string {
        return this._type;
    }

    public get defenseIndex(): Number {
        return this._defenseIndex;
    }

    public get healthPoints(): Number {
        return this._healthPoints;
    }

    public get movements(): Movement[] {
        return this._movements;
    }
}