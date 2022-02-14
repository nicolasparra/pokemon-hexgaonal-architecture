import express from "express";
import MovementController from "./Movement.controller";

export default class MovementRouter {
  public path = "/movement";
  public router = express.Router();
  private movementController: MovementController;

  constructor() {
    this.movementController = new MovementController();

    this.router.get(`${this.path}/`, this.movementController.getAll);
    this.router.get(`${this.path}/:id`, this.movementController.getById);
    this.router.post(`${this.path}/`, this.movementController.create);
    this.router.put(`${this.path}/:id`, this.movementController.update);
    this.router.delete(`${this.path}/:id`, this.movementController.delete);
  }
}
