import {
  AbstractResponse,
  AbstractController,
} from '../../../../../abstractions/infrastructure/controllers';
import ValueObjectValidationError from '../../../../../abstractions/application/Errors/ValueObjectValidationError';
import RegisterNewUser, {
  RegisterNewUserProps,
} from '../../../application/RegisterNewUser/RegisterNewUserUseCase';

type RegisterNewUserRequestObject = {
  fullName?: string;
  email?: string;
  password?: string;
};

export default class RegisterNewUserController extends AbstractController<RegisterNewUserRequestObject> {
  private useCase: RegisterNewUser;

  public constructor(useCase: RegisterNewUser) {
    super();

    this.useCase = useCase;
  }

  public execute(
    requestObject: RegisterNewUserRequestObject
  ): AbstractResponse {
    const props: RegisterNewUserProps = {
      fullName: requestObject.fullName || '',
      email: requestObject.email || '',
      password: requestObject.password || '',
    };

    try {
      this.useCase.execute(props);

      return this.ok();
    } catch (error) {
      if (error instanceof ValueObjectValidationError) {
        const errorMessages = error.message.split(',');
        return this.badRequest(errorMessages);
      }

      return this.serverError();
    }
  }
}
