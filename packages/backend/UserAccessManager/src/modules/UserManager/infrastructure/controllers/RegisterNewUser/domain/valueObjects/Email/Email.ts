import {
  ValueObjectResult,
  ValueObjectResultSuccess,
  ValueObjectResultFail,
} from '../../../../../../../../abstractions/domain/valueObjects/ValueObjectResult';

type EmailProps = {
  email: string;
};

type EmailValidatorsProps = {
  emailValidator: () => string;
};

class Email {
  public email: string;

  private emailValidator: () => string;

  public static create(
    emailValidators: EmailValidatorsProps,
    props: EmailProps
  ): ValueObjectResult<Email> {
    if (!props.email) {
      return new ValueObjectResultFail('[email] cannot be empty');
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
  private emailValidator: () => string;

  public constructor(emailValidators: EmailValidatorsProps) {
    this.emailValidator = emailValidators.emailValidator;
  }

  public build(props: EmailProps): ValueObjectResult<Email> {
    return Email.create({ emailValidator: this.emailValidator }, props);
  }
}
