import Pokemon from "../../../pokemon-management/pokemon/domain/Pokemon";
import Trainer from "../domain/Trainer";

interface IProducer {
  emitOpponents({
    opponent1,
    pokemons1,
    opponent2,
    pokemons2 }: {
      opponent1: Trainer,
      opponent2: Trainer,
      pokemons1: Pokemon[]
      pokemons2: Pokemon[]
    }
  ): Promise<void | Error>;
}

export default IProducer;
