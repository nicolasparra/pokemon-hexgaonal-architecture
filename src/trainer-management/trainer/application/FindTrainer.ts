import Trainer from "../domain/Trainer";
import TrainerRepository from "../domain/Trainer.repository";

export default class FindTrainer {
  trainerRepository: TrainerRepository;

  constructor(trainerRepository: TrainerRepository) {
    this.trainerRepository = trainerRepository;
  }

  getAll = async () => {
    try {
      const allTrainers = await this.trainerRepository.findAll();

      return allTrainers;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  getById = async (id: string) => {
    try {
      const trainer = await this.trainerRepository.findById(id);

      return trainer;
    } catch (err) {
      throw new Error(err.message);
    }
  };
  getByName = async (name: string): Promise<Trainer> => {
    try {
      const trainer = await this.trainerRepository.findByName(name);

      return trainer;
    } catch (err) {
      throw new Error(err.message);
    }
  };
}
