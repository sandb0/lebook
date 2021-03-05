import AbstractResponse from './AbstractResponse';

export enum HTTPStatusCode {
  Ok = 200,
  BadRequest = 400,
  ServerError = 500,
}

export default abstract class AbstractController<T> {
  protected errorMessages: string[] = [];

  public abstract execute(requestObject: T): AbstractResponse;

  protected ok(): AbstractResponse {
    return {
      statusCode: HTTPStatusCode.Ok,
    };
  }

  protected badRequest(): AbstractResponse {
    return {
      statusCode: HTTPStatusCode.BadRequest,
      error: {
        messages: this.errorMessages,
      },
    };
  }

  protected serverError(): AbstractResponse {
    return {
      statusCode: HTTPStatusCode.ServerError,
      error: {
        messages: this.errorMessages,
      },
    };
  }
}
