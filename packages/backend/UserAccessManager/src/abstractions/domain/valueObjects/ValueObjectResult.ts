export class ValueObjectResult<T> {
  protected valueObjectInstance?: T;
  protected errorMessage = '';

  get value(): T | undefined {
    return this.valueObjectInstance;
  }

  get error(): string {
    return this.errorMessage;
  }
}

export class ValueObjectResultSuccess<T> extends ValueObjectResult<T> {
  public constructor(valueObjectInstance: T) {
    super();

    this.valueObjectInstance = valueObjectInstance;
  }
}

export class ValueObjectResultFail<T> extends ValueObjectResult<T> {
  public constructor(errorMessage: string) {
    super();

    this.errorMessage = errorMessage;
  }
}
