import express from "express";
import * as bodyParser from "body-parser";
import ErrorMiddleware from "../shared/middlewares/Error.middleware";
import RabbitMQInit from "./rabbitmq.init";
import morgan from "morgan";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { SWAGGER_OPTIONS, CREATE_QUEUE_RABBIT } from "./config";
import Consumer from "../battle-management/battle/infrastructure/Pokemon.consumer";
import {
  HealthChecker,
  HealthEndpoint,
  ReadinessEndpoint,
  LivenessEndpoint,
} from "@cloudnative/health-connect";
import path from "path";
import { CheckCircuitBreakerMiddleware } from "../shared/middlewares/checkCircuitBreaker.middleware";
import { CircuitBreaker } from "./circuitBreaker/CircuitBreaker";
import cors from "cors"

class App {

  public app: express.Application;
  public port: number;
  private rabbitMQ: RabbitMQInit;
  public consumer: Consumer;
  public circuitBreaker: CircuitBreaker;

  constructor(routers, port) {
    this.app = express();
    this.app.use(cors({
      origin: '*'
    }));
    port ? (this.port = port) : (this.port = 3000);

    this.initializeCircuitBreaker();
    this.initializedStatic();
    this.initMorganLogger();
    this.initializeMiddlewares();
    this.initializeRouters(routers);
    this.initializeErrorHandling();
    if (
      CREATE_QUEUE_RABBIT != "false" &&
      CREATE_QUEUE_RABBIT.toLowerCase() == "true"
    ) {
      this.initMessageBroke(this.rabbitMQ);
    }

    this.initializedUploads();
    this.initializeSwagger();
  }

  private initializeCircuitBreaker() {
    this.app.use(CheckCircuitBreakerMiddleware);
    global.circuitBreaker = new CircuitBreaker();
  }

  private initializedStatic() {
    this.app.use("/static", express.static(__dirname + "/assets"));
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }

  private initializeRouters(routers) {
    routers.forEach((router) => {
      this.app.use("", router.router);
    });
  }

  private initializedUploads() {
    this.app.use("/uploads", express.static(path.resolve("uploads")));
  }

  private async initMessageBroke(rabitmqInit: RabbitMQInit) {
    rabitmqInit = new RabbitMQInit();
  }

  private initializeConsumer() {
    this.consumer = new Consumer();
    this.consumer.Consumer();
  }

  private async initMorganLogger() {
    morgan.token(`status`, (req, res) => {
      const status = (
        typeof res.headersSent !== `boolean`
          ? Boolean(res._header)
          : res.headersSent
      )
        ? res.statusCode
        : undefined;

      // get status color
      const color =
        status >= 500
          ? 31 // red
          : status >= 400
            ? 33 // yellow
            : status >= 300
              ? 36 // cyan
              : status >= 200
                ? 32 // green
                : 0; // no color
      return `\x1b[${color}m${status}\x1b[0m`;
    });
    this.app.use(morgan(":method :url :status - :response-time ms"));
  }

  private initializeHealthCheck(): express.Router {
    const heathRouter = express.Router();

    let healthCheck = new HealthChecker();
    heathRouter.use("/live", LivenessEndpoint(healthCheck));
    heathRouter.use("/ready", ReadinessEndpoint(healthCheck));
    heathRouter.use("/health", HealthEndpoint(healthCheck));

    return heathRouter;
  }

  private initializeSwagger() {
    const specs = swaggerJsdoc(SWAGGER_OPTIONS);
    this.app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
  }

  public async listen() {
    try {
      this.app.listen(this.port, () => {
        this.initializeConsumer();
        console.log(`App listening on the port ${this.port}`);
        this.app.use("/check", this.initializeHealthCheck());
      });
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

}

export default App;
