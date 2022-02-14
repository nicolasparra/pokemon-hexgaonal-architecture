import Battle from "./Battle";

export default interface BattleRepository {

    create(battle: Battle): Promise<Object>;

    findWonBattlesById(winner: string): Promise<Battle[]>

    findAll(): Promise<Battle[]>

}