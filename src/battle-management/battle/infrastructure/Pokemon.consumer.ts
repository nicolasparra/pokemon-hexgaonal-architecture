import * as config from "../../../shared/config";

export default class Consumer {
  constructor() {
    //this.recibeMessage();
  }
  async Consumer() {
    const exchange: String = "Pokemon";
    const queue: String = "PokemonBattle";
    try {
      const conn = await require("amqplib").connect(config.BROKER_HOST);

      const channel = await conn.createChannel();

      channel.consume(queue, (message) => {
        console.log(message.content.toString());

        channel.ack(message);
      });
    } catch (error) {
      console.error(error);
    }
  }
}
