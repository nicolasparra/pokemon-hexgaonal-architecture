import Movement from "../domain/Movement";
import MovementRepository from "../domain/Movement.repository";

export default class CreateMovement {
  movementRepository: MovementRepository;

  constructor(movementRepository: MovementRepository) {
    this.movementRepository = movementRepository;
  }

  create = async (movement: Movement) => {
    try {
      const created = await this.movementRepository.create(movement);

      return created;
    } catch (err) {
      throw new Error(err.message);
    }
  };
}
