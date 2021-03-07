import { AbstractUseCase } from '../../../../abstractions/application';
import ValueObjectValidationRule from '../../../../abstractions/application/Rules/ValueObjectValidationRule';
import { EmailFactory } from '../../domain/valueObjects/Email';

export type RegisterNewUserProps = {
  fullName: string;
  email: string;
  password: string;
};

export default class RegisterNewUser extends AbstractUseCase<RegisterNewUserProps> {
  private emailFactory: EmailFactory;

  public constructor(emailFactory: EmailFactory) {
    super();

    this.emailFactory = emailFactory;
  }

  public execute(props: RegisterNewUserProps): string {
    const emailObject = this.emailFactory.create({ email: props.email });

    this.checkRule(new ValueObjectValidationRule([emailObject]));

    return 'UseCase';
  }
}
