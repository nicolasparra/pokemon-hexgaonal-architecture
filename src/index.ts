import { config } from "dotenv";
config();

import { PORT } from "./shared/config";
import App from "./shared/app";
import DatabaseConnection from "./shared/databases.connection";

//Routes
import PokemonRoutes from "./pokemon-management/pokemon/infrastructure/Pokemon.router";
import MovementRoutes from "./pokemon-management/movement/infrastructure/Movement.router";
import TrainerRouter from "./trainer-management/trainer/infrastructure/Trainer.router";

async function init() {
  const databaseConnection = new DatabaseConnection();
  await databaseConnection
    .mongooseDB()
    .then(() => {
      const app = new App([new PokemonRoutes(), new MovementRoutes(), new TrainerRouter()], PORT);
      app.listen();
    })
    .catch((err) => {
      console.log(err);
    });
}

init();
