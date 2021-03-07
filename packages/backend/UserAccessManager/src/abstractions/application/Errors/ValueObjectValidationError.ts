export default class ValueObjectValidationError extends Error {
  public constructor(message: string) {
    super(message);

    this.name = 'ValueObjectValidationError';
  }
}
