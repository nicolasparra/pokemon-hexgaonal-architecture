import * as config from "./config";
import amqp = require("amqplib/callback_api");

export default class BrokerConnection {
  constructor() {
    this.init();
  }

  async init() {
    await amqp.connect(config.BROKER_HOST, async function (err, conn) {
      if (err) {
        throw new Error(err.message);
      }
      await conn.createChannel(async function (err2, ch) {
        if (err2) {
          throw new Error(err2.message);
        }
        // set exchange that is being used
        const exchange = await ch.assertExchange(
          config.BROKER_EXCHANGE,
          config.BROKER_TYPE_EXCHANGE,
          { durable: true }
        );
        //create Cola
        const queue = await ch.assertQueue(config.BROKER_QUEUE, {
          durable: false,
        });
        //Set queue queue,exchange, KEY
        const bind = await ch.bindQueue(
          config.BROKER_QUEUE,
          config.BROKER_EXCHANGE,
          config.BROKER_BINDING_KEY
        );
        console.log("Queue Created");
        return true;
      });
    });
  }
}
