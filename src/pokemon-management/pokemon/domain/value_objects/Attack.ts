

class Attack {
    public value: number;
    private isMoreThan = 0;

    constructor(value) {
        this.value = value;
        if (!this.checkIsMoreThan(this.isMoreThan)) {
            throw new Error(`The Attack of Pokemon must be more than ${this.isMoreThan}`);
        }

        if(!this.checkValue(this.value)){
            throw new Error(`Attack is required`);
        }
    }
    private checkIsMoreThan(cant: number): boolean {
        return this.value > cant;
    }

    private checkValue(value:number): boolean{
        return value ? true:false;
    }

}

export default Attack;