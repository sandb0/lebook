import AbstractRule from '../AbstractRule';
import { ValueObject } from '../../domain/valueObjects';
import ValueObjectValidationError from '../Errors/ValueObjectValidationError';

export default class ValueObjectValidationRule extends AbstractRule {
  private valueObjects: ValueObject[];

  public constructor(valueObjects: ValueObject[]) {
    super();

    this.valueObjects = valueObjects;
  }

  public hasError(): boolean {
    return ValueObject.getValueObjectsWithError(this.valueObjects).length > 0;
  }

  public getError(): ValueObjectValidationError {
    const errorMessages: string[] = [];
    let errorMessagesToString = '';

    this.valueObjects.forEach((valueObject) => {
      errorMessages.push(valueObject.error);
    });

    errorMessagesToString = errorMessages.join(',');

    return new ValueObjectValidationError(errorMessagesToString);
  }
}
