import AbstractResponse from './AbstractResponse';

enum HTTPStatusCode {
  Ok = 200,
  BadRequest = 400,
}

export default abstract class AbstractController<T> {
  protected errorMessages: string[] = [];

  public abstract execute(requestObject: T): AbstractResponse;

  public ok(): AbstractResponse {
    return {
      statusCode: HTTPStatusCode.Ok,
    };
  }

  public badRequest(): AbstractResponse {
    return {
      statusCode: HTTPStatusCode.BadRequest,
      error: {
        messages: this.errorMessages,
      },
    };
  }
}
