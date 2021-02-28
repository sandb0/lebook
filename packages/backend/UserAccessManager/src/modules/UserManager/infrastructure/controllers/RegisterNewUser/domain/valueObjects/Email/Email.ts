import {
  ValueObjectResult,
  ValueObjectResultSuccess,
  ValueObjectResultFail,
} from '../../../../../../../../abstractions/domain/valueObjects/ValueObjectResult';

interface EmailValidator {
  isEmail(email: string): boolean;
}

type EmailProps = {
  email: string;
};

type EmailValidatorsProps = {
  emailValidator: EmailValidator;
};

class Email {
  public email: string;

  private emailValidator: EmailValidator;

  public static create(
    emailValidators: EmailValidatorsProps,
    props: EmailProps
  ): ValueObjectResult<Email> {
    const { email } = props;
    const { emailValidator } = emailValidators;

    if (!props.email) {
      return new ValueObjectResultFail('[email] cannot be empty');
    }

    if (!emailValidator.isEmail(email)) {
      return new ValueObjectResultFail(`[email] "${email}" is invalid`);
    }

    return new ValueObjectResultSuccess(new Email(emailValidators, props));
  }

  private constructor(
    emailValidators: EmailValidatorsProps,
    props: EmailProps
  ) {
    this.email = props.email;
    this.emailValidator = emailValidators.emailValidator;
  }
}

export default class EmailFactory {
  private emailValidator: EmailValidator;

  public constructor(emailValidators: EmailValidatorsProps) {
    this.emailValidator = emailValidators.emailValidator;
  }

  public build(props: EmailProps): ValueObjectResult<Email> {
    return Email.create({ emailValidator: this.emailValidator }, props);
  }
}
