import EmailFactory from '../../domain/valueObjects/Email/EmailFactory';

export type RegisterNewUserProps = {
  fullName: string;
  email: string;
  password: string;
};

export default class RegisterNewUser {
  private emailFactory: EmailFactory;

  public constructor(emailFactory: EmailFactory) {
    this.emailFactory = emailFactory;
  }

  public execute(props: RegisterNewUserProps): string {
    const emailObject = this.emailFactory.create({ email: props.email });

    if (emailObject.error) {
      return emailObject.error;
    }

    return 'UseCase';
  }
}
