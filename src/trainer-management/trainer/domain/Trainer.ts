import Gender from "../../../shared/domain/Gender";
import Name from "../../../shared/domain/Name";
import { v1 as uuidv1 } from "uuid";
import Password from "../../../shared/domain/Password";

export default class Trainer {
  private _idTrainer: string;
  private _name: Name;
  private _gender: Gender;
  private _pokemons: [string?, string?, string?, string?, string?, string?];
  private _password: Password;
  readonly isMoreThan = 6;

  constructor({
    name,
    gender,
    password,
    pokemons,
  }: {
    name: string;
    gender: Gender;
    password: string;
    pokemons?: [string?, string?, string?, string?, string?, string?];
  }) {
    this._idTrainer = uuidv1();
    this._name = new Name(name);
    this._gender = gender;
    this._password = new Password(password);
    if (!this.checkEnum(this._gender)) {
      throw new Error(`Invalid Gender`);
    }
    this._pokemons = pokemons || [];
    if (!this.checkPokemons(this.isMoreThan)) {
      throw new Error(
        `The amount of Pokemons cannot be greater than  ${this.isMoreThan}`
      );
    }
  }

  public get idTrainer(): string {
    return this._idTrainer;
  }

  public set idTrainer(idTrainer: string) {
    this._idTrainer = idTrainer;
  }

  public get name(): Name {
    return this._name;
  }

  // public set name(name: Name) {
  //   this._name = name;
  // }

  public get gender(): Gender {
    return this._gender;
  }

  public get password(): Password {
    return this._password;
  }

  // public set gender(gender: Gender) {
  //   this._gender = gender;
  // }

  public get pokemons() {
    return this._pokemons;
  }
  private checkPokemons(cant: Number): boolean {
    return this._pokemons.length <= cant;
  }

  private checkEnum(gender: Gender): boolean {
    return Object.values(Gender).includes(gender);
  }

  async comparePassword(password: string) {
    return await this._password.comparePassword(password);
  }

  toJSON = (): Object => {
    const json = {
      idTrainer: this.idTrainer,
      name: this.name.value,
      gender: this.gender,
      password: this.password.value,
      pokemons: this.pokemons,
    };
    return json;
  };
}
