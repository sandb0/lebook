import AbstractResponse from './AbstractResponse';

export enum HTTPStatusCode {
  Ok = 200,
  BadRequest = 400,
  ServerError = 500,
}

export default abstract class AbstractController<T> {
  public abstract execute(requestObject: T): AbstractResponse;

  protected ok(): AbstractResponse {
    return {
      statusCode: HTTPStatusCode.Ok,
    };
  }

  protected badRequest(errorMessages: string[]): AbstractResponse {
    return {
      statusCode: HTTPStatusCode.BadRequest,
      error: {
        messages: errorMessages,
      },
    };
  }

  protected serverError(): AbstractResponse {
    return {
      statusCode: HTTPStatusCode.ServerError,
    };
  }
}
