import * as config from "../../../../shared/config";
import amqp = require("amqplib/callback_api");
import IProducerRepository from "../../domain/IProducer";
import Trainer from "../../domain/Trainer";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import Pokemon from "../../../../pokemon-management/pokemon/domain/Pokemon";

export default class ProducerRepository implements IProducerRepository {

  constructor() { }


  async emitOpponents({ opponent1, pokemons1, opponent2, pokemons2 }) {

    let fOpponent = {
      "id": opponent1.idTrainer,
      "name": opponent1.name,
      "pokemons": pokemons1
    }
    let sOpponnet = {
      "id": opponent2.idTrainer,
      "name": opponent2.name,
      "pokemons": pokemons2
    }

    await amqp.connect(config.BROKER_HOST, async function (err, conn) {
      if (err) {
        throw new Error(err.message);
      }
      conn.createChannel(async function (err2, ch) {
        if (err2) {
          // conn.close();
          throw new Error(err2.message);
        }
        const attributes = {
          firstOpponent: fOpponent,
          secondOpponent: sOpponnet,
        };
        const message = {
          data: {
            id: uuidv4(),
            type: "pokemon.opponents.battle",
            ocurred_ond: moment().format("YYYY-MM-DD HH:mm:ss"),
            attributes,
          },
          meta: {
            service: "ManagePokemon",
          },
        };
        const published = await ch.publish(
          config.BROKER_EXCHANGE,
          config.BROKER_BINDING_KEY,
          Buffer.from(JSON.stringify(message))
        );
        return published;
      });
      setTimeout(function () {
        conn.close();
      }, 500);
    });
  }

}
