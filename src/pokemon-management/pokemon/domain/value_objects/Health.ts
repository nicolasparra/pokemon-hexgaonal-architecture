class Health {
    public value: number;
    private isMoreThan = 0;

    constructor(value) {
        this.value = value;
        if (!this.checkIsMoreThan(this.isMoreThan)) {
            throw new Error(`The Health of Pokemon must be more than ${this.isMoreThan}`);
        }
        if(!this.checkValue(this.value)){
            throw new Error(`health is required`);
        }
    }
    private checkIsMoreThan(cant: number): boolean {
        return this.value > cant;
    }

    private checkValue(value:number): boolean{
        return value ? true:false;
    }

}

export default Health;