import ValueObjectFactory from '../../../../../abstractions/domain/valueObjects/ValueObjectFactory';
import Email, { EmailValidators, EmailProps } from './Email';
import IEmailValidator from '../../../../../frameworks/validators/IEmailValidator';

export default class EmailFactory extends ValueObjectFactory<
  Email,
  EmailProps
> {
  private emailValidator: IEmailValidator;

  public constructor(validators: EmailValidators) {
    super();

    const { emailValidator } = validators;

    this.emailValidator = emailValidator;
  }

  public create(props: EmailProps): Email {
    return new Email({ emailValidator: this.emailValidator }, props);
  }
}
