import Name from "../../../shared/domain/Name";
import Type from "../../../shared/domain/Type";
import Attack from "./value_objects/Attack";
import Defense from "./value_objects/Defense";
import Health from "./value_objects/Health";
import { v1 as uuidv1 } from "uuid";
import validate from "uuid-validate";

class Pokemon {
  private id: string;
  private _name: Name;
  private _type: Type;
  private _attack: Attack;
  private _defense: Defense;
  private _health: Health;
  private _movements: [string?, string?, string?, string?];
  private _filePath: String;
  readonly isMoreThan = 4;

  constructor({
    name,
    type,
    attack,
    defense,
    health,
    movements,
    filePath,
  }: {
    name: string;
    type: Type;
    attack: Number;
    defense: Number;
    health: Number;
    movements?: [string?, string?, string?, string?];
    filePath?: string;
  }) {
    this.id = uuidv1();
    this._name = new Name(name);
    this._attack = new Attack(attack);
    this._defense = new Defense(defense);
    this._health = new Health(health);
    this._type = type;
    this._movements = movements || [];
    this._filePath = filePath || "";
    if (!this.checkEnum(this._type)) {
      throw new Error(`Invalid Pokemon Type`);
    }
    if (!this.checkMovements(this.isMoreThan)) {
      throw new Error(
        `The amount of movements cannot be greater than  ${this.isMoreThan}`
      );
    }
    if (!this.checkMovementsString()) {
      throw new Error(`The movements must be of type string`);
    }
  }

  public get idPokemon() {
    return this.id;
  }

  public get name() {
    return this._name;
  }

  public get type() {
    return this._type;
  }

  public get attack() {
    return this._attack;
  }

  public get defense() {
    return this._defense;
  }

  public get health() {
    return this._health;
  }

  public get movements() {
    return this._movements;
  }

  public get filePath() {
    return this._filePath;
  }

  public set idPokemon(idPokemon: string) {
    if (!validate(idPokemon)) {
      throw new Error(`id Pokemon does not allow the value <${idPokemon}>`);
    }
    this.id = idPokemon;
  }

  // public set name(name: Name) {
  //   this._name = name;
  // }

  // public set type(type: Type) {
  //   this._type = type;
  // }

  // public set attack(attack: Attack) {
  //   this._attack = attack;
  // }

  // public set defense(defense: Defense) {
  //   this._defense = defense;
  // }

  // public set health(health: Health) {
  //   this._health = health;
  // }

  private checkEnum(type: Type): boolean {
    return Object.values(Type).includes(type);
  }

  private checkMovements(cant: Number): boolean {
    return this._movements.length <= cant;
  }

  private checkMovementsString(): boolean {
    let aux = true;
    this._movements.forEach((e) => {
      if (typeof e != "string") {
        aux = false;
      }
    });
    return aux;
  }

  toJSON = (): Object => {
    const json = {
      idPokemon: this.id,
      name: this.name.value,
      type: this.type,
      attack: this.attack.value,
      defense: this.defense.value,
      health: this.health.value,
      movements: this._movements,
      filePath: this._filePath,
    };
    return json;
  };
}

export default Pokemon;
