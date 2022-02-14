import Trainer from "../../../../src/trainer-management/trainer/domain/Trainer"
import ITrainer from "../../../../src/trainer-management/trainer/domain/Trainer.repository"
import TrainerSchema from "../../../../src/trainer-management/trainer/infrastructure/repositories/Trainer.schema"

export default class TrainerRepositoryTest implements ITrainer {
    findByName(name: string): Promise<Trainer> {
        throw new Error("Method not implemented.");
    }
    dataSchema: Trainer[] = [];
    dataObject: Trainer[] = [];

    async findById(id: string): Promise<Trainer> {
        try {

            const trainer = await this.dataObject.find((trainer) => trainer.idTrainer == id)

            if (!trainer) {
                throw new Error("Error on find by id.")
            }
            return trainer

        } catch (error) {

        }
    }
    async findAll(): Promise<Trainer[]> {
        return this.dataSchema
    }
    async create(trainer: Trainer): Promise<Object> {
        const trainerJson = trainer.toJSON();
        const trainerToSave = new TrainerSchema(trainerJson)

        this.dataObject.push(trainer)
        this.dataSchema.push(trainerToSave)
        return trainerToSave

    }
    async delete(id: string): Promise<void> {

        this.dataSchema.map(element => {
            if (element.idTrainer != id) {
                return element
            }
        })
        this.dataObject.map(element => {
            if (element.idTrainer != id) {
                return element
            }
        })


    }
    async update(trainer: Trainer): Promise<Trainer> {

        this.delete(trainer.idTrainer)
        trainer.idTrainer = trainer.idTrainer
        const trainerJson = trainer.toJSON();
        const trainerToSave = new TrainerSchema(trainerJson)

        this.dataObject.push(trainer)
        this.dataSchema.push(trainerToSave)


        return trainerToSave
    }

}