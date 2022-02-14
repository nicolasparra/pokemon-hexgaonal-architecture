import Battle from "../domain/Battle";
import IBattle from "../domain/IBattle";
import Opponent from "../domain/Opponent";

export default class GenerateBattle {
    iBattle: IBattle

    constructor(iBattle: IBattle) {
        iBattle = this.iBattle;
    }

    generateBattle = async (battle: Battle) => {

        try {
            const succesBattle = await this.iBattle.generateBattle(battle)
            return succesBattle
        } catch (error) {
            throw new Error(error.message)
        }
    }
}