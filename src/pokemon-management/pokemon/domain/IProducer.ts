import Pokemon from "./Pokemon";

interface IProducer {
  emitBattle(
    firstPokemon: Pokemon,
    secondPokemon: Pokemon
  ): Promise<void | Error>;
}

export default IProducer;
