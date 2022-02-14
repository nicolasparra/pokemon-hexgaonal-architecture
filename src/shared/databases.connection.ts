import { MONGODB_URI } from "./config";
import { connect } from "mongoose";

export default class DatabaseConnection {
  public db: any;

  async mongooseDB() {
    console.log("Connecting to mongodb...");
    return await connect(MONGODB_URI)
      .then(() => {
        console.log("connected to MongoDB");
      })
      .catch((err) => {
        console.log("Error connect to MongoDB");
        throw new Error(err);
      });
  }
}
