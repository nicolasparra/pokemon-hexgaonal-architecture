import Opponent from "./Opponent"

export default class Battle {

    private _winner: string
    private _losser: string
    private _firstOpponent: Opponent
    private _secondOpponent: Opponent

    constructor(
        winner: string,
        losser: string,
        firstOpponent: Opponent,
        secondOpponent: Opponent
    ) {
        this._winner = winner
        this._losser = losser
        this._firstOpponent = firstOpponent
        this._secondOpponent = secondOpponent
    }

    public get winner(): string {
        return this._winner;
    }

    public get losser(): string {
        return this._losser;
    }

    public get firstOpponent(): Opponent {
        return this._firstOpponent;
    }

    public get secondOpponent(): Opponent {
        return this._secondOpponent;
    }
}