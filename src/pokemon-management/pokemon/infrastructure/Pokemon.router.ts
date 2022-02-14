import express from "express";
import PokemonController from "./Pokemon.controller";
import multer from "../../../shared/libs/multer";

export default class PokemonRouter {
  public path = "/pokemon";
  public router = express.Router();
  private pokemonController: PokemonController;

  constructor() {
    this.pokemonController = new PokemonController();

    this.router.get(`${this.path}/`, this.pokemonController.getAll);
    this.router.get(`${this.path}/:id`, this.pokemonController.getById);
    this.router.post(
      `${this.path}/`,
      multer.single("image"),
      this.pokemonController.create
    );
    this.router.put(`${this.path}/:id`, this.pokemonController.update);
    this.router.delete(`${this.path}/:id`, this.pokemonController.delete);
    this.router.post(`/test`, this.pokemonController.test);
    this.router.get(`${this.path}/pdf/:id`, this.pokemonController.getPdf);
  }
}
