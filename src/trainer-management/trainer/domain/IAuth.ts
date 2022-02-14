import Trainer from "./Trainer";
export default interface LoginRepository {
  JwtSign(object: Object): Promise<string>;
  //SIGNOUT
}
