interface IConsumer {
  consumerMessage(): Promise<void | Error>;
}

export default IConsumer;
