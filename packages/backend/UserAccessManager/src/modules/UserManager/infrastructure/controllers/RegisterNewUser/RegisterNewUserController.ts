import {
  AbstractResponse,
  AbstractController,
} from '../../../../../abstractions/infrastructure/controllers';
import ValueObjectValidationError from '../../../../../abstractions/application/Errors/ValueObjectValidationError';
import RegisterNewUserService, {
  RegisterNewUserProps,
} from '../../../application/RegisterNewUserService/RegisterNewUserService';

type RegisterNewUserRequestObject = {
  fullName?: string;
  email?: string;
  password?: string;
};

export default class RegisterNewUserController extends AbstractController<RegisterNewUserRequestObject> {
  private applicationService: RegisterNewUserService;

  public constructor(applicationService: RegisterNewUserService) {
    super();

    this.applicationService = applicationService;
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
      this.applicationService.execute(props);

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
