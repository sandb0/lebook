import {
  ValueObjectCreation,
  ValueObjectCreationFail,
} from './ValueObjectCreation';

export default class AbstractValueObject {
  protected getValidationErrors<T extends AbstractValueObject>(
    rules: (ValueObjectCreationFail<T> | undefined)[]
  ): ValueObjectCreation<T> | undefined {
    for (let index = 0; index < rules.length; index++) {
      const hasError = rules[index];

      if (hasError && hasError instanceof ValueObjectCreationFail) {
        return hasError;
      }
    }
  }
}
