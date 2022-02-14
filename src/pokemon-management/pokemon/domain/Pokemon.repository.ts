import Pokemon from "./Pokemon";
import { Nullable } from "../../../shared/domain/Nullable";

interface PokemonRepository {
  findById(id: string): Promise<Pokemon>;

  findAll(): Promise<Pokemon[]>;

  create(pokemon: Pokemon): Promise<void>;

  delete(id: string): Promise<void>;

  update(pokemon: Pokemon): Promise<Pokemon>;

  getPdfBuffer(id: string): Promise<Nullable<Buffer>>;
}

export default PokemonRepository;
