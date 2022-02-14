import { NextFunction, Request, Response } from "express";
import {
  CreateMovement,
  DeleteMovement,
  FindMovement,
  UpdateMovement,
} from "../application";
import MongooseRepository from "./repositories/Mongoose.repository";
import HttpException from "../../../shared/exceptions/HttpException";
import Movement from "../domain/Movement";

export default class MovementController {
  createMovement: CreateMovement;
  deleteMovement: DeleteMovement;
  findMovement: FindMovement;
  updateMovement: UpdateMovement;

  constructor() {
    const BD = new MongooseRepository();
    this.createMovement = new CreateMovement(BD);
    this.deleteMovement = new DeleteMovement(BD);
    this.findMovement = new FindMovement(BD);
    this.updateMovement = new UpdateMovement(BD);
  }

  getAll = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const array = await this.findMovement.getAll();

      return response.status(200).send(array);
    } catch (error) {
      return next(error);
    }
  };

  getById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = request.params;
      const movement = await this.findMovement.getById(id);

      return response.status(200).send(movement);
    } catch (error) {
      return next(error);
    }
  };

  create = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { name, type, power, accuracy } = request.body;
      const movement = new Movement({ name, type, power, accuracy });
      const movementCreated = await this.createMovement.create(movement);

      return response.status(201).send();
    } catch (error) {
      return next(error);
    }
  };

  update = async (request: Request, response: Response, next: NextFunction) => {
    try {
      let changes;
      const { id } = request.params;
      const { name, type, power, accuracy } = request.body;
      const movement = new Movement({ name, type, power, accuracy });
      movement.idMovement = id;
      const movementUpdated = await this.updateMovement.update(movement);
      if (!movementUpdated) {
        return response.status(404).send("Movement not found");
      }

      changes = {
        previus: movementUpdated,
        current: movement.toJSON()
      }

      return response.status(200).send(changes);
    } catch (error) {
      return next(error);
    }
  };

  delete = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params;
      const deleted = await this.deleteMovement.delete(id);

      return response.status(200).send();
    } catch (error) {
      return next(error);
    }
  };
}
