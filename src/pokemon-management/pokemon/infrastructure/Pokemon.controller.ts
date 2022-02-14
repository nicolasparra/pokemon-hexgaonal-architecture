import { Request, Response, NextFunction } from "express";
import {
  CreatePokemon,
  DeletePokemon,
  FindPokemon,
  UpdatePokemon,
  EmitMessage,
  CreatePdf,
} from "../application";
import MongooseRepository from "./repositories/Mongoose.repository";
import MovementMongooseRepository from "../../movement/infrastructure/repositories/Mongoose.repository";
import RabbitMQProducer from "./repositories/Rabbitmq.producer";
import Pokemon from "../domain/Pokemon";

export default class PokemonController {
  createPokemon: CreatePokemon;
  deletePokemon: DeletePokemon;
  findPokemon: FindPokemon;
  updatePokemon: UpdatePokemon;
  emitMessage: EmitMessage;
  createPdf: CreatePdf;

  constructor() {
    const messageBroker = new RabbitMQProducer();
    const BD = new MongooseRepository();
    const BDMovement = new MovementMongooseRepository();
    this.createPokemon = new CreatePokemon(BD, BDMovement);
    this.deletePokemon = new DeletePokemon(BD);
    this.findPokemon = new FindPokemon(BD);
    this.updatePokemon = new UpdatePokemon(BD);
    this.emitMessage = new EmitMessage(messageBroker, BD);
    this.createPdf = new CreatePdf(BD);
  }

  getAll = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const array = await this.findPokemon.getAll();

      return response.status(200).send(array);
    } catch (error) {
      return next(error);
    }
  };

  getById = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const pokemon = await this.findPokemon.getById(id);

      return response.status(200).send(pokemon);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  };

  create = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { name, type, attack, defense, health, movements } = request.body;
      let path = "";
      if (request.file) {
        path = request.file.path || "";
      }
      const pokemon = new Pokemon({
        name,
        type,
        attack,
        defense,
        health,
        movements,
        filePath: path,
      });
      const pokemonCrated = await this.createPokemon.create(pokemon);

      return response.status(201).send();
    } catch (error) {
      return next(error);
    }
  };

  update = async (request: Request, response: Response, next: NextFunction) => {
    try {
      let changes;
      const { id } = request.params;
      const { name, type, attack, defense, health } = request.body;
      const pokemon = new Pokemon({ name, type, attack, defense, health });
      pokemon.idPokemon = id;
      const pokemonUpdated = await this.updatePokemon.update(pokemon);
      if (!pokemonUpdated) {
        return response.status(404).send("Pokemon not found");
      }


      changes = {
        previus: pokemonUpdated,
        current: pokemon.toJSON()
      }

      return response.status(201).send(changes);
    } catch (error) {
      return next(error);
    }
  };

  delete = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params;
      const deleted = await this.deletePokemon.delete(id);

      return response.status(200).send();
    } catch (error) {
      return next(error);
    }
  };

  test = async (request: Request, response: Response) => {
    try {
      const { firstId, secondId } = request.body;
      await this.emitMessage.emitBattle(firstId, secondId);
      return response.status(200).send("ok");
    } catch (error) {
      console.log(error);
      return response.status(400).send(error.message);
    }
  };

  getPdf = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params;
      const buffer = await this.createPdf.createPdfBuffer(id);
      return response
        .writeHead(200, {
          "Content-Type": "application/pdf",
          "Content-disposition": "attachment;filename=Ficha.pdf",
        })
        .end(buffer);
    } catch (error) {
      return next(error);
    }
  };
}
