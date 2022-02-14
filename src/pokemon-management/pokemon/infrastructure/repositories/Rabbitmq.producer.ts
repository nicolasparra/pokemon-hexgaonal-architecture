// import BrokerConnection from "../../../../shared/rabbitmq.init";
import * as config from "../../../../shared/config";
import amqp = require("amqplib/callback_api");
import IProducerRepository from "../../domain/IProducer";
import Pokemon from "../../domain/Pokemon";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

export default class ProducerRepository implements IProducerRepository {
  // public queue: String;
  // public message: String;
  // constructor(queue, message) {
  //     // this.broker = new BrokerConnection();
  //     this.queue   = queue;
  //     this.message = message;
  //     // this.init();
  //     // this.emitMessage(this.queue,this.message);
  // }
  constructor() {}

  // async emitBattle(firstPokemon:Pokemon,secondPokemon:Pokemon) {
  //     let connection = amqp.createConnection(
  //         {hostname: config.BROKER_HOST,
  //         port: parseInt(config.BROKER_PORT,10),
  //         username: config.BROKER_USER,
  //         password: config.BROKER_PASSWORD
  //         });

  //     connection.on('ready', function () {
  //         connection.exchange(config.BROKER_EXCHANGE, function(exchange) {
  //             const sendMessage = function(exchange,payload) {
  //                 console.log('about to publish')
  //             //    " var encoded_payload = JSON.stringify(payload);"
  //                 exchange.publish(config.BROKER_BINDING_KEY, "encoded_payload", {})
  //             }
  //         }
  //     })
  // }

  // async emitBattle(firstPokemon:Pokemon,secondPokemon:Pokemon) {
  //     let connection = amqp.createConnection(
  //         {hostname: config.BROKER_HOST,
  //         port: parseInt(config.BROKER_PORT,10),
  //         username: config.BROKER_USER,
  //         password: config.BROKER_PASSWORD
  //         });

  //     connection.on('ready', function () {
  //         connection.exchange(config.BROKER_EXCHANGE, function(exchange) {
  //             const sendMessage = function(exchange,payload) {
  //                 console.log('about to publish')
  //             //    " var encoded_payload = JSON.stringify(payload);"
  //                 exchange.publish(config.BROKER_BINDING_KEY, "encoded_payload", {})
  //             }
  //         }
  //     })
  // }

  async emitBattle(firstPokemon: Pokemon, secondPokemon: Pokemon) {
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
          fPokemon: firstPokemon,
          sPokemon: secondPokemon,
        };
        const message = {
          data: {
            id: uuidv4(),
            type: "nicompany.pokemon.1.battleCreated",
            ocurred_ond: moment().format("YYYY-MM-DD HH:mm:ss"),
            attributes,
          },
          meta: {
            service: "MicroServicePokemon",
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

  // async emitBattle2(firstPokemon:Pokemon,secondPokemon:Pokemon){

  //     amqp.connect({
  //         hostname: config.BROKER_HOST,
  //         port: parseInt(config.BROKER_PORT,10),
  //         username: config.BROKER_USER,
  //         password: config.BROKER_PASSWORD,
  //     }, function(err, conn) {
  //         if (err) {
  //             throw new Error(err.message);
  //         }
  //         conn.createChannel(function (err2, ch) {
  //             if (err2) {
  //                 throw new Error(err2.message);
  //             }
  //             // set exchange that is being used
  //             // ch.assertExchange('exangeTest', 'direct', {durable: true});
  //             ch.publish('exangeTest', '123456', Buffer.from("MENSAJE"));
  //             console.log(" [x] Sent %s", "msg");
  //             return true;
  //             //---------------------------CONSUME--------------------------
  //             // set queue that is being used
  //             // ch.assertQueue('Cola', {durable: true}, function (err3, q) {
  //             //     if (err3) {
  //             //         throw new Error(err3.message);
  //             //     }
  //             //     console.log(q);
  //             //     console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
  //             //     // bind the queue to the exchange
  //             //     ch.bindQueue(q.queue, 'direct', '');
  //             //     // consume from the queue, one message at a time.
  //             //     ch.consume(q.queue, function (msg) {
  //             //         console.log("Message received: %s", msg.content.toString());
  //             //         //save message to db
  //             //         // db.store(msg.content.toString()).then(function() {
  //             //         //     //acknowledge receipt of message to amqp
  //             //         //     console.log("Acknowledging message");
  //             //         //     ch.ack(msg, true);
  //             //         // });
  //             //     }, {noAck: false});
  //             // });
  //         });
  //         // setTimeout(function() {
  //         //     conn.close();
  //         //     process.exit(0);
  //         // }, 500);
  //     });
  // }
}
