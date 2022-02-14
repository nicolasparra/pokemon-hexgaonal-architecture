import MovementRepository from "../domain/Movement.repository";

export default class FindMovement {
  movementRepository: MovementRepository;

  constructor(movementRepository: MovementRepository) {
    this.movementRepository = movementRepository;
  }

  getAll = async () => {
    try {
      const allMovements = await this.movementRepository.findAll();

      return allMovements;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  getById = async (id: string) => {
    try {
      const movement = await this.movementRepository.findById(id);

      return movement;
    } catch (err) {
      throw new Error(err.message);
    }
  };
}
