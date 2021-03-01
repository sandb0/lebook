import AbstractValueObject from './AbstractValueObject';

export class ValueObjectCreation<T extends AbstractValueObject> {
  protected valueObjectInstance?: T;
  protected errorMessage = '';

  public static getErrors(
    valueObjects: ValueObjectCreation<AbstractValueObject>[]
  ): ValueObjectCreation<AbstractValueObject>[] {
    const errors: ValueObjectCreation<AbstractValueObject>[] = [];

    valueObjects.forEach((valueObject) => {
      if (valueObject.error) {
        errors.push(valueObject);
      }
    });

    return errors;
  }

  get value(): T | undefined {
    return this.valueObjectInstance;
  }

  get error(): string {
    return this.errorMessage;
  }
}

export class ValueObjectCreationSuccess<
  T extends AbstractValueObject
> extends ValueObjectCreation<T> {
  public constructor(valueObjectInstance: T) {
    super();

    this.valueObjectInstance = valueObjectInstance;
  }
}

export class ValueObjectCreationFail<
  T extends AbstractValueObject
> extends ValueObjectCreation<T> {
  public constructor(errorMessage: string) {
    super();

    this.errorMessage = errorMessage;
  }
}
