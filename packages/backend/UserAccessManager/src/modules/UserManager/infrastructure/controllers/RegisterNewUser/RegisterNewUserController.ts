import {
  AbstractResponse,
  AbstractController,
} from '../../../../../abstractions/infrastructure/controllers';
import RegisterNewUser, {
  RegisterNewUserProps,
} from '../../../application/RegisterNewUser/RegisterNewUser';

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

    this.useCase.execute(props);

    return this.ok();
  }
}
