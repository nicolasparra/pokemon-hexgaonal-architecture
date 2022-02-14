import bcrypt from "bcryptjs";

class Password {
  public value: string;
  private isMoreThan = 5;

  constructor(value) {
    this.value = value;
    if (!value) {
      throw new Error(`Password is required`);
    }
    if (!this.checkIsMoreThan(this.isMoreThan)) {
      throw new Error(
        `The length of Password must be more than ${this.isMoreThan}`
      );
    }
  }
  private checkIsMoreThan(cant: Number): boolean {
    return this.value.length > cant;
  }

  public async generatePasswordEncrypted() {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(this.value, salt);
      this.value = hash;
    } catch (error) {
      throw new Error("Password encryption failed ");
    }
  }

  public async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.value);
  }
}

export default Password;
