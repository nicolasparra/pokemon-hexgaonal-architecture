import Battle from "../domain/Battle";
import BattleRepository from "../domain/Battle.repository";

export default class CreateBattle {
    battleRepository: BattleRepository

    constructor(battleRepository: BattleRepository) {
        this.battleRepository = battleRepository
    }

    create = async (battle: Battle) => {
        try {
            const created = await this.battleRepository.create(battle)
            return created
        } catch (error) {
            throw new Error(error.message);
        }
    }

}