import Movement from "../domain/Movement";
import MovementRepository from "../domain/Movement.repository";

export default class UpdateMovement {
  movementRepository: MovementRepository;

  constructor(movementRepository: MovementRepository) {
    this.movementRepository = movementRepository;
  }

  update = async (movement: Movement) => {
    try {
      const update = await this.movementRepository.update(movement);

      return update;
    } catch (err) {
      throw new Error(err.message);
    }
  };
}
