import Trainer from "./Trainer";

export default interface TrainerRepository {

    create(trainer: Trainer): Promise<Object>;

    findById(id: string): Promise<Trainer>;

    findByName(name: string): Promise<Trainer>;

    findAll(): Promise<Trainer[]>;

    update(trainer: Trainer): Promise<Trainer>;

    delete(id: string): Promise<void>;
}