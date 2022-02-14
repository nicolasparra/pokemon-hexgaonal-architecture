import Trainer from "../../domain/Trainer";
import IAuth from "../../domain/IAuth";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../../../shared/config";

export default class Login implements IAuth {
  expired: Number;
  constructor() {
    this.expired = 60 * 60 * 24; //Expired in 24 hours
  }

  JwtSign = async (trainer: Trainer): Promise<string> => {
    try {
      const wt = await jwt.sign({ Trainer: trainer }, JWT_SECRET, {
        expiresIn: this.expired.toString(),
      });
      // const token: string = "Bearer " + wt;
      return wt;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
