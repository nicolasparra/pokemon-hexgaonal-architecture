import { Request, Response, NextFunction } from "express";
import MongooseRepository from "./repositories/Mongoose.repository";
import PokemonMongooseRepository from "./../../../pokemon-management/pokemon/infrastructure/repositories/Mongoose.repository";
import Login from "./repositories/Login";
import RabbitMQProducer from "../infrastructure/repositories/Rabbitmq.producer";
import {
  CreateTrainer,
  DeleteTrainer,
  FindTrainer,
  UpdateTrainer,
  Auth,
  EmitOpponents
} from "../application";
import Trainer from "../domain/Trainer";
import Gender from "../../../shared/domain/Gender";

export default class TrainerController {
  createTrainer: CreateTrainer;
  deleteTrainer: DeleteTrainer;
  findTrainer: FindTrainer;
  updateTrainer: UpdateTrainer;
  auth: Auth;
  emitOpponents: EmitOpponents;


  constructor() {
    const BD = new MongooseRepository();
    const BDPokemon = new PokemonMongooseRepository();
    this.createTrainer = new CreateTrainer(BD, BDPokemon);
    const login = new Login();
    this.deleteTrainer = new DeleteTrainer(BD);
    this.findTrainer = new FindTrainer(BD);
    this.updateTrainer = new UpdateTrainer(BD);
    this.auth = new Auth(login);
    const messageBroker = new RabbitMQProducer();
    this.emitOpponents = new EmitOpponents(messageBroker, BD, BDPokemon)
  }

  create = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { name, gender, pokemons, password } = request.body;
      const trainer = new Trainer({ name, gender, pokemons, password });
      const trainerCrated = await this.createTrainer.create(trainer);

      return response.status(201).send();
    } catch (error) {
      return next(error);
    }
  };

  login = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { name, password } = request.body;
      if (!name || !password)
        return response
          .status(400)
          .send({ message: "name and password required" });

      const trainerSearch: Trainer = await this.findTrainer.getByName(name);
      if (!trainerSearch)
        return response.status(400).send({ message: "trainer not found" });

      const trainer = new Trainer({
        name: trainerSearch.name.toString(),
        gender: Gender[trainerSearch.gender.toString()],
        password: trainerSearch.password.toString(),
      });
      const login = await this.auth.GetJWT(trainer, password);

      return response.status(200).send({ token: login });
    } catch (error) {
      return next(error);
    }
  };

  test = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const user = request.user;
      return response.status(201).send({ user });
    } catch (error) {
      return next(error);
    }
  };

  apiKey = async (request: Request, response: Response, next: NextFunction) => {
    try {
      return response.status(201).send({ state: "success" });
    } catch (error) {
      return next(error);
    }
  };

  getAll = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const trainers = await this.findTrainer.getAll();

      return response.status(200).send(trainers);
    } catch (error) {
      return next(error);
    }
  };

  getById = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const trainer = await this.findTrainer.getById(id);

      return response.status(200).send(trainer);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  };

  update = async (request: Request, response: Response, next: NextFunction) => {
    try {
      let changes;
      const { id } = request.params;
      const { name, gender, pokemons, password } = request.body;
      const trainer = new Trainer({ name, gender, pokemons, password });
      trainer.idTrainer = id;
      const trainerUpdated = await this.updateTrainer.update(trainer);
      if (!trainerUpdated) {
        return response.status(404).send("Trainer not found");
      }

      changes = {
        previus: trainerUpdated,
        current: trainer.toJSON(),
      };

      return response.status(201).send(changes);
    } catch (error) {
      return next(error);
    }
  };

  delete = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params;
      const deleted = await this.deleteTrainer.delete(id);

      return response.status(200).send();
    } catch (error) {
      return next(error);
    }
  };

  publishOpponents = async (request: Request, response: Response) => {
    try {
      const { firstOpponentId, secondOpponentId, pokemonsFirstOpponent, pokemonsSecondOpponent } = request.body;
      await this.emitOpponents.emitOpponents(firstOpponentId, secondOpponentId, pokemonsFirstOpponent, pokemonsSecondOpponent);
      return response.status(200).send("ok");
    } catch (error) {
      console.log(error);
      return response.status(400).send(error.message);
    }
  };
}
