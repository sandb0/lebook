type AbstractResponse = {
  statusCode: number;
  error?: {
    type: string;
    message: Array<string>;
  };
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
    const errorMessage = Array<string>();

    if (!requestObject.fullName) {
      errorMessage.push('[fullName] cannot be empty');
    }

    if (!requestObject.email) {
      errorMessage.push('[email] cannot be empty');
    }

    if (!requestObject.password) {
      errorMessage.push('[password] cannot be empty');
    }

    if (errorMessage) {
      return {
        statusCode: 400,
        error: {
          type: 'InvalidRequestError',
          message: errorMessage,
        },
      };
    }

    return {
      statusCode: 200,
    };
  }
}
