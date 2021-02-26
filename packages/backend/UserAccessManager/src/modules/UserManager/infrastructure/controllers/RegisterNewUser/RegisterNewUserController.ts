type AbstractResponse = {
  statusCode: number;
};

type RegisterNewUserRequestObject = {
  fullName?: string;
  email?: string;
  password?: string;
};

export default class RegisterNewUserController {
  public execute(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    requestObject: RegisterNewUserRequestObject
  ): AbstractResponse {
    return {
      statusCode: 400,
    };
  }
}
