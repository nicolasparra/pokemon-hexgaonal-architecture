export default class Movement {

    private _name: string
    private _damage: Number
    private _accuracy: Number

    constructor(
        name: string,
        damage: Number,
        accuracy: Number,
    ) {
        this._name = name
        this._damage = damage
        this._accuracy = accuracy
    }

    public get name(): string {
        return this._name;
    }

    public get damage(): Number {
        return this._damage;
    }

    public get accuracy(): Number {
        return this._accuracy;
    }
}