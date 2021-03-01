import AbstractValueObject from '../../../../../abstractions/domain/valueObjects/AbstractValueObject';
import {
  ValueObjectCreation,
  ValueObjectCreationFail,
  ValueObjectCreationSuccess,
} from '../../../../../abstractions/domain/valueObjects/ValueObjectCreation';

export interface IEmailValidator {
  isEmail(email: string): boolean;
}

type EmailProps = {
  email: string;
};

type EmailValidators = {
  emailValidator: IEmailValidator;
};

class Email extends AbstractValueObject {
  private emailValidator: IEmailValidator;
  private _email = '';

  public static build(
    validators: EmailValidators,
    props: EmailProps
  ): ValueObjectCreation<Email> {
    return new Email(validators, props).create();
  }

  get email(): string {
    return this._email;
  }

  private constructor(validators: EmailValidators, props: EmailProps) {
    super();

    const { emailValidator } = validators;
    const { email } = props;

    this.emailValidator = emailValidator;
    this._email = email;
  }

  private create() {
    const rules = [this.emailCannotBeEmptyRule(), this.emailMustBeValidRule()];
    const hasError = this.getValidationErrors(rules);

    if (hasError) {
      return hasError;
    }

    this.standardize();

    return new ValueObjectCreationSuccess<Email>(this);
  }

  private standardize() {
    this._email = this._email.trim().toLowerCase();
  }

  private emailCannotBeEmptyRule() {
    if (!this._email) {
      return new ValueObjectCreationFail<Email>('[email] cannot be empty');
    }
  }

  private emailMustBeValidRule() {
    if (!this.emailValidator.isEmail(this._email)) {
      return new ValueObjectCreationFail<Email>(
        `[email] "${this._email}" must be a valid email`
      );
    }
  }
}

export default class EmailFactory {
  private emailValidator: IEmailValidator;

  public constructor(validators: EmailValidators) {
    const { emailValidator } = validators;

    this.emailValidator = emailValidator;
  }

  public build(props: EmailProps): ValueObjectCreation<Email> {
    return Email.build({ emailValidator: this.emailValidator }, props);
  }
}
