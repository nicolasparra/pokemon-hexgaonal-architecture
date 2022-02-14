import express from "express";
import TrainerController from "./Trainer.controller";
import { JWTMiddleware } from "../../../shared/middlewares/Jwt.middleware";
import { ApiKeyMiddleware } from "../../../shared/middlewares/ApiKey.middleware";

export default class TrainerRouter {
  public path = "/trainer";
  public router = express.Router();
  public trainerController: TrainerController;

  constructor() {
    this.trainerController = new TrainerController();
    this.router.post(`${this.path}/login`, this.trainerController.login);
    this.router.post(`${this.path}`, this.trainerController.create);
    this.router.get(
      `${this.path}/test`,
      JWTMiddleware,
      this.trainerController.test
    );
    this.router.get(
      `${this.path}/key`,
      ApiKeyMiddleware,
      this.trainerController.apiKey
    );
    this.router.get(`${this.path}`, this.trainerController.getAll);
    this.router.get(`${this.path}/:id`, this.trainerController.getById);
    this.router.put(`${this.path}/:id`, this.trainerController.update);
    this.router.delete(`${this.path}/:id`, this.trainerController.delete);
    this.router.post(`${this.path}/opponents`, this.trainerController.publishOpponents);

  }
}
