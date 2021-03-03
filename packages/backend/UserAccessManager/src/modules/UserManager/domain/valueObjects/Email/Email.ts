import ValueObject from '../../../../../abstractions/domain/valueObjects/ValueObject';

export interface IEmailValidator {
  isEmail(email: string): boolean;
}

export type EmailProps = {
  email: string;
};

export type EmailValidators = {
  emailValidator: IEmailValidator;
};

export default class Email extends ValueObject {
  private _email: string;
  private emailValidator: IEmailValidator;

  public constructor(validators: EmailValidators, props: EmailProps) {
    super();

    const { emailValidator } = validators;
    const { email } = props;

    this.emailValidator = emailValidator;
    this._email = email;

    this.validationRules();
  }

  get email(): string {
    return this._email;
  }

  protected validationRules(): void {
    this.checkValidationRule(this.emailCannotBeEmptyRule.bind(this));
    this.checkValidationRule(this.emailMustBeValidRule.bind(this));
  }

  private emailCannotBeEmptyRule() {
    if (!this.email) {
      this.error = '[email] cannot be empty';
    }
  }

  private emailMustBeValidRule() {
    if (!this.emailValidator.isEmail(this.email)) {
      this.error = `[email] "${this.email}" must be a valid email`;
    }
  }
}
