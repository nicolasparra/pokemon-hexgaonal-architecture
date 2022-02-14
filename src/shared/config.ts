const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;
const BROKER_HOST = process.env.BROKER_HOST || "localhost";
const BROKER_PORT = process.env.BROKER_PORT || "5672";
const BROKER_EXCHANGE = process.env.BROKER_EXCHANGE || "Pokemon";
const BROKER_QUEUE = process.env.BROKER_QUEUE || "PokemonBattle";
const BROKER_TYPE_EXCHANGE = process.env.BROKER_TYPE_EXCHANGE || "direct";
const BROKER_BINDING_KEY = process.env.BROKER_BINDING_KEY || "123456";
const API_URI = process.env.API_URI || `http://localhost:${PORT}`;
const CREATE_QUEUE_RABBIT = process.env.CREATE_QUEUE_RABBIT || "false";
const API_KEY = process.env.API_KEY;


const SWAGGER_OPTIONS = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Pokemon management api hexagonal architecture",
      version: "0.1.0",
      description:
        "This project applies the hexagonal architecture, and the consumption between micro services, for the administration of Pokemons, battles and breeding services.",
    },
    servers: [{ url: `${API_URI}` }],
    noImplicitAny: true,
    components: {
      securitySchemes: {
        jwt: {
          type: "http",
          scheme: "bearer",
          in: "header",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        jwt: [],
      },
    ],
  },
  apis: [
    "./src/**/**/infrastructure/*.ts",
    "./src/shared/swagger/*.swagger.yml",
    "./src/**/**/domain/*.ts",
  ],
};

export {
  MONGODB_URI,
  PORT,
  BROKER_HOST,
  BROKER_PORT,
  BROKER_EXCHANGE,
  BROKER_QUEUE,
  BROKER_TYPE_EXCHANGE,
  BROKER_BINDING_KEY,
  SWAGGER_OPTIONS,
  API_URI,
  CREATE_QUEUE_RABBIT,
  JWT_SECRET,
  API_KEY,
};
