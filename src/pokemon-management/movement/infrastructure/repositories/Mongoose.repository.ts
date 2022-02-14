import Movement from "pokemon-management/movement/domain/Movement";
import MovementRepository from "../../domain/Movement.repository";
import MovementSchema from "./Movement.schema";

export default class MongooseRepository implements MovementRepository {
  constructor() { }

  findAll = async (): Promise<Movement[]> => {
    return await MovementSchema.find()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  findById = async (id: string): Promise<Movement> => {
    return await MovementSchema.findOne({ idMovement: id })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  create = async (movement: Movement): Promise<void> => {
    const movementJSON = movement.toJSON();
    return await MovementSchema.create(movementJSON)
      .then((res) => {
        return;
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  update = async (movement: Movement): Promise<Movement> => {
    const movementJSON = movement.toJSON();
    const id = movement.idMovement;
    return await MovementSchema.findOneAndUpdate(
      { idMovement: id },
      movementJSON
    )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  delete = async (id: string): Promise<void> => {
    return await MovementSchema.deleteOne({ idMovement: id })
      .then((res) => {
        return;
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
}
