import Trainer from "../../domain/Trainer";
import TrainerRepository from "../../domain/Trainer.repository";
import TrainerSchema from "./Trainer.schema";

export default class MongooseRepository implements TrainerRepository {
  constructor() { }

  findAll = async (): Promise<Trainer[]> => {
    const pipeline = [
      {
        $lookup: {
          from: "pokemons",
          let: { pokemons: "$pokemons" },
          pipeline: [
            {
              $match: {
                $expr: { $in: ["$idPokemon", "$$pokemons"] },
              },
            },
          ],
          as: "pokemons",
        },
      },
    ];
    return await TrainerSchema.aggregate(pipeline)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  findById = async (id: string): Promise<Trainer> => {
    const pipeline = [
      {
        $match: {
          idTrainer: id,
        },
      },
      {
        $lookup: {
          from: "pokemons",
          let: { pokemons: "$pokemons" },
          pipeline: [
            {
              $match: {
                $expr: { $in: ["$idPokemon", "$$pokemons"] },
              },
            },
          ],
          as: "pokemons",
        },
      },
    ];
    try {
      const trainer = await TrainerSchema.aggregate(pipeline);
      return trainer[0];
    } catch (error) {
      throw new Error(error.message);
    }
  };

  findByName = async (name: string): Promise<Trainer> => {
    return await TrainerSchema.findOne({ name: name }, "+password")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  create = async (trainer: Trainer): Promise<Object> => {
    await trainer.password.generatePasswordEncrypted();
    const trainerJSON = trainer.toJSON();
    return await TrainerSchema.create(trainerJSON)
      .then((res) => {
        return trainerJSON;
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  update = async (Trainer: Trainer): Promise<Trainer> => {
    const trainerJSON = Trainer.toJSON();
    const id = Trainer.idTrainer;
    return await TrainerSchema.findOneAndUpdate({ idTrainer: id }, trainerJSON)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  delete = async (id: string): Promise<void> => {
    return await TrainerSchema.deleteOne({ idTrainer: id })
      .then((res) => {
        return;
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
}
