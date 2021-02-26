type AbstractResponse = {
  statusCode: number;
  error?: {
    type: string;
    message: string;
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
    if (!requestObject.fullName) {
      return {
        statusCode: 400,
        error: {
          type: 'InvalidRequestError',
          message: '[fullName] cannot be empty',
        },
      };
    }

    if (!requestObject.email) {
      return {
        statusCode: 400,
        error: {
          type: 'InvalidRequestError',
          message: '[email] cannot be empty',
        },
      };
    }

    if (!requestObject.password) {
      return {
        statusCode: 400,
        error: {
          type: 'InvalidRequestError',
          message: '[password] cannot be empty',
        },
      };
    }

    return {
      statusCode: 200,
    };
  }
}
