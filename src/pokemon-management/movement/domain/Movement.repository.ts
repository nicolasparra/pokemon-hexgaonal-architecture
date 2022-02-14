import Movement from "./Movement";

interface MovementRepository {
  findById(id: string): Promise<Movement>;

  findAll(): Promise<Movement[]>;

  create(movement: Movement): Promise<void>;

  delete(id: string): Promise<void>;

  update(movement: Movement): Promise<Movement>;
}

export default MovementRepository;
