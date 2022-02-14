import BattleRepository from "../domain/Battle.repository";

export default class FindBattle {
    battleRepository: BattleRepository

    constructor(battleRepository: BattleRepository) {
        this.battleRepository = battleRepository
    }

    getAll = async () => {

        try {
            const AllBattles = await this.battleRepository.findAll();
            return AllBattles
        } catch (error) {
            throw new Error(error.message)
        }
    }

    getWonBattlesById = async (id: string) => {

        try {
            const AllWonBattles = await this.battleRepository.findWonBattlesById(id);
            return AllWonBattles
        } catch (error) {
            throw new Error(error.message)
        }
    }
}