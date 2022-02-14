import Trainer from "../domain/Trainer";
import TrainerRepository from "../domain/Trainer.repository";

export default class UpdateTrainer {
  trainerRepository: TrainerRepository;

  constructor(trainerRepository: TrainerRepository) {
    this.trainerRepository = trainerRepository;
  }

  update = async (trainer: Trainer) => {
    try {
      const update = await this.trainerRepository.update(trainer);

      return update;
    } catch (err) {
      throw new Error(err.message);
    }
  };
}
