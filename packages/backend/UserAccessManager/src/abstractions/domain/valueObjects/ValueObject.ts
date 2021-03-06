export default abstract class ValueObject {
  private _error = '';

  get error(): string {
    return this._error;
  }

  set error(errorMessage: string) {
    this._error = errorMessage;
  }

  protected checkValidationRule(validationRule: () => void): void {
    if (!this.hasValidationError()) {
      validationRule();
    }
  }

  protected hasValidationError(): boolean {
    return !!this._error;
  }

  protected abstract validationRules(): void;
}
