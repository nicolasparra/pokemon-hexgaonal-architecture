import Name from "../../../shared/domain/Name";
import Type from "../../../shared/domain/Type";
import Accuracy from "./value_objects/Accuracy";
import Power from "./value_objects/Power";
import { v1 as uuidv1 } from "uuid";
import validate from "uuid-validate";

class Movement {
  private id: string;
  private _name: Name;
  private _type: Type;

  private _accuracy: Accuracy;
  private _power: Power;

  constructor({
    name,
    type,
    accuracy,
    power,
  }: {
    name: string;
    type: Type;
    accuracy: Number;
    power: Number;
  }) {
    this.id = uuidv1();
    this._name = new Name(name);
    this._accuracy = new Accuracy(accuracy);
    this._power = new Power(power);
    this._type = type;
    if (!this.checkEnum(this._type)) {
      throw new Error(`Invalid Movement Type`);
    }
  }

  public get idMovement() {
    return this.id;
  }
  public get name() {
    return this._name;
  }

  public get type() {
    return this._type;
  }

  public get accuracy() {
    return this._accuracy;
  }

  public get power() {
    return this._power;
  }

  public set idMovement(idMovement: string) {
    if (!validate(idMovement)) {
      throw new Error(`id Pokemon does not allow the value <${idMovement}>`);
    }
    this.id = idMovement;
  }

  private checkEnum(type: Type): boolean {
    return Object.values(Type).includes(type);
  }

  toJSON = (): Object => {
    const json = {
      idMovement: this.id,
      name: this.name.value,
      type: this.type,
      power: this.power.value,
      accuracy: this.accuracy.value,
    };
    return json;
  };
}

export default Movement;
