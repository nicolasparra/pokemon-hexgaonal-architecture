import Trainer from "../domain/Trainer";
import TrainerRepository from "../domain/Trainer.repository";

export default class DeleteTrainer {
    trainerRepository: TrainerRepository;

    constructor(trainerRepository: TrainerRepository) {
        this.trainerRepository = trainerRepository;
    }

    delete = async (id: string) => {
        try {
            const deleted = await this.trainerRepository.delete(id);
            return deleted;
        } catch (err) {
            throw new Error(err.message);
        }
    };
}