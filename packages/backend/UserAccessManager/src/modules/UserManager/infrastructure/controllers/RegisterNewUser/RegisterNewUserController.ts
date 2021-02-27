import AbstractController from '../../../../../abstractions/infrastructure/controllers/AbstractController';
import AbstractResponse from '../../../../../abstractions/infrastructure/controllers/AbstractResponse';

type RegisterNewUserRequestObject = {
  fullName?: string;
  email?: string;
  password?: string;
};

export default class RegisterNewUserController extends AbstractController<RegisterNewUserRequestObject> {
  public execute(
    requestObject: RegisterNewUserRequestObject
  ): AbstractResponse {
    if (!requestObject.fullName) {
      this.errorMessages.push('[fullName] cannot be empty');
    }

    if (!requestObject.email) {
      this.errorMessages.push('[email] cannot be empty');
    }

    if (!requestObject.password) {
      this.errorMessages.push('[password] cannot be empty');
    }

    if (this.errorMessages) {
      return this.badRequest();
    }

    return this.ok();
  }
}
