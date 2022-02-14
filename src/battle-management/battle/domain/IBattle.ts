import Battle from "./Battle";

export default interface IBattle {

    generateBattle(battle: Battle): Promise<Battle>
}