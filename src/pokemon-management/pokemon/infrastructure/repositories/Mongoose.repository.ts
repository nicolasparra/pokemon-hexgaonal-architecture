import Pokemon from "pokemon-management/pokemon/domain/Pokemon";
import PokemonRepository from "../../domain/Pokemon.repository";
import PokemonSchema from "./Pokemon.schema";
import path from "path";
import fse from "fs-extra";
import BufferPdf from "../../../../shared/libs/toPdf";
import { Nullable } from "../../../../shared/domain/Nullable";

export default class MongooseRepository implements PokemonRepository {
  constructor() { }

  findAll = async (): Promise<Pokemon[]> => {
    const pipeline = [
      {
        $lookup: {
          from: "movements",
          let: { m: "$movements" },
          pipeline: [
            {
              $match: {
                $expr: { $in: ["$idMovement", "$$m"] },
              },
            },
          ],
          as: "movements",
        },
      },
    ];
    return await PokemonSchema.aggregate(pipeline)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  findById = async (id: string): Promise<Pokemon> => {
    const pipeline = [
      {
        $match: {
          idPokemon: id,
        },
      },
      {
        $lookup: {
          from: "movements",
          let: { m: "$movements" },
          pipeline: [
            {
              $match: {
                $expr: { $in: ["$idMovement", "$$m"] },
              },
            },
          ],
          as: "movements",
        },
      },
    ];
    try {
      const pokemon = await PokemonSchema.aggregate(pipeline);

      return pokemon[0];
    } catch (error) {
      throw new Error(error.message);
    }
  };

  create = async (pokemon: Pokemon): Promise<void> => {
    const pokemonJSON = pokemon.toJSON();
    return await PokemonSchema.create(pokemonJSON)
      .then((res) => {
        return;
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  update = async (pokemon: Pokemon): Promise<Pokemon> => {
    const pokemonJSON = pokemon.toJSON();
    const id = pokemon.idPokemon;
    delete pokemonJSON["movements"];
    delete pokemonJSON["filePath"];
    return await PokemonSchema.findOneAndUpdate({ idPokemon: id }, pokemonJSON)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  delete = async (id: string): Promise<void> => {
    try {
      const deleted = await PokemonSchema.findOneAndRemove({ idPokemon: id });
      if (deleted) {
        await fse.unlink(path.resolve(deleted.filePath));
      }
      return;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getPdfBuffer = async (id: string): Promise<Nullable<Buffer>> => {
    try {
      const pokemon = await PokemonSchema.findOne({ idPokemon: id });
      if (!pokemon) {
        throw new Error("Pokemon not found");
      }
      return new Promise<Buffer>((resolve, reject) => {
        BufferPdf.toBuffer(pokemon)
          .then((res: Buffer) => resolve(res))
          .catch((e) => reject(e));
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
