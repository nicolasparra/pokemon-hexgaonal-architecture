class Name {
    public value: string;
    private isMoreThan = 2;

    constructor(value) {
        this.value = value;
        if (!this.checkIsMoreThan(this.isMoreThan)) {
            throw new Error(`The length of name must be more than ${this.isMoreThan}`);
        }
    }
    private checkIsMoreThan(cant: Number): boolean {
        return this.value.length > cant;
    }

}

export default Name;