class Accuracy {
    public value: Number;
    private isMoreThan = 0;

    constructor(value) {
        this.value = value;
        if (!this.checkIsMoreThan(this.isMoreThan)) {
            throw new Error(`The Accuracy of movement must be more than ${this.isMoreThan}`);
        }
    }
    private checkIsMoreThan(cant: Number): boolean {
        return this.value > cant;
    }

}

export default Accuracy;