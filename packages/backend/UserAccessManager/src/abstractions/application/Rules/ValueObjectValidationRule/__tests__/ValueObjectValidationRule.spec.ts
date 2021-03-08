import { ValueObject } from '../../../../domain/valueObjects';
import ValueObjectValidationError from '../../../Errors/ValueObjectValidationError';
import ValueObjectValidationRule from '../ValueObjectValidationRule';

describe('Abstractions', () => {
  describe('ValueObjectValidationRule', () => {
    test('if `hasError()` method return true when value objects on the constructor has an error', () => {
      const ValueObjectMock = jest.fn<Partial<ValueObject>, []>();
      const valueObjectMock = new ValueObjectMock() as ValueObject;
      valueObjectMock.error = 'Any Error';

      const SUT = new ValueObjectValidationRule([valueObjectMock]);

      expect(SUT.hasError()).toBe(true);
    });

    test('if `hasError()` method return false when value objects on the constructor do not have any error', () => {
      const ValueObjectMock = jest.fn<Partial<ValueObject>, []>();
      const valueObjectMock = new ValueObjectMock() as ValueObject;

      const SUT = new ValueObjectValidationRule([valueObjectMock]);

      expect(SUT.hasError()).toBe(false);
    });

    test('if `getError()` return an instance of `ValueObjectValidationError` and the `Error.message` is an array of all value objects errors contatenated to a string', () => {
      const ValueObjectMock = jest.fn<Partial<ValueObject>, []>();
      const valueObjectMock1 = new ValueObjectMock() as ValueObject;
      const valueObjectMock2 = new ValueObjectMock() as ValueObject;

      const errorMessage1 = 'Any Error 1';
      const errorMessage2 = 'Any Error 2';
      const errorMessagesToString = [errorMessage1, errorMessage2].join(',');

      valueObjectMock1.error = errorMessage1;
      valueObjectMock2.error = errorMessage2;

      const SUT = new ValueObjectValidationRule([
        valueObjectMock1,
        valueObjectMock2,
      ]);

      const errorInstance = SUT.getError();

      expect(errorInstance).toBeInstanceOf(ValueObjectValidationError);
      expect(errorInstance.message).toEqual(errorMessagesToString);
    });
  });
});
