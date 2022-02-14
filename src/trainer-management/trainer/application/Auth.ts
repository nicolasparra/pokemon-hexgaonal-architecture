import Login from "../domain/IAuth";
import Trainer from "../domain/Trainer";

export default class Auth {
  login: Login;
  constructor(LoginRepository: Login) {
    this.login = LoginRepository;
  }

  GetJWT = async (trainer: Trainer, password: string) => {
    try {
      const aux = await trainer.comparePassword(password);
      if (!aux) throw new Error("invalid name or password");

      return await this.login.JwtSign(trainer);
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
