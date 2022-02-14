import MovementRepository from "../domain/Movement.repository";

export default class DeleteMovement {
    movementRepository: MovementRepository;

    constructor(movementRepository: MovementRepository) {
        this.movementRepository = movementRepository;
    }

    delete = async (id: string) => {
        try {
            const deleted = await this.movementRepository.delete(id);
            return deleted;
        } catch (err) {
            throw new Error(err.message);
        }
    };
}