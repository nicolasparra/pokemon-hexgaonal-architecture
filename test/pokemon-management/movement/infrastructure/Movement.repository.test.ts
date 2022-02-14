import Movement from "../../../../src/pokemon-management/movement/domain/Movement"
import IMovement from "../../../../src/pokemon-management/movement/domain/Movement.repository"
import MovementSchema from "../../../../src/pokemon-management/movement/infrastructure/repositories/Movement.schema"

export default class MovementRepositoryTest implements IMovement {
    dataSchema: Movement[] = [];
    dataObject: Movement[] = [];

    async findById(id: string): Promise<Movement> {
        try {

            const movement = await this.dataObject.find((movement) => movement.idMovement == id)

            if (!movement) {
                throw new Error("Error on find by id.")
            }
            return movement

        } catch (error) {

        }
    }
    async findAll(): Promise<Movement[]> {
        return this.dataSchema
    }
    async create(movement: Movement): Promise<void> {
        const movementJson = movement.toJSON();
        const movementToSave = new MovementSchema(movementJson)

        this.dataObject.push(movement)
        this.dataSchema.push(movementToSave)
        return movementToSave

    }
    async delete(id: string): Promise<void> {

        // this.dataSchema.forEach(element => {
        //     if (element.idMovement == id) {
        //     }
        // });
        this.dataSchema.map(element => {
            if (element.idMovement != id) {
                return element
            }
        })
        this.dataObject.map(element => {
            if (element.idMovement != id) {
                return element
            }
        })


    }
    async update(movement: Movement): Promise<Movement> {

        this.delete(movement.idMovement)
        movement.idMovement = movement.idMovement
        const movementJson = movement.toJSON();
        const movementToSave = new MovementSchema(movementJson)

        this.dataObject.push(movement)
        this.dataSchema.push(movementToSave)


        return movementToSave
    }

}