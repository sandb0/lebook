import AbstractController, { HTTPStatusCode } from '../AbstractController';
import AbstractResponse from '../AbstractResponse';

type RequestObject = null;

class ControllerMock extends AbstractController<RequestObject> {
  public execute(): AbstractResponse {
    const response: AbstractResponse = {
      statusCode: HTTPStatusCode.Ok,
    };

    return response;
  }

  public okSpy() {
    return this.ok();
  }

  public badRequestSpy(errorMessages: string[]) {
    return this.badRequest(errorMessages);
  }

  public serverErrorSpy() {
    return this.serverError();
  }
}

describe('Abstractions', () => {
  describe('AbstractController', () => {
    it('should return the expected `responseObject` when `ok()` method is called', () => {
      const SUT = new ControllerMock();

      const responseObject = {
        statusCode: HTTPStatusCode.Ok,
      };

      expect(SUT.okSpy()).toEqual(responseObject);
    });

    it('should return the expected `responseObject` when `badRequest()` method is called', () => {
      const SUT = new ControllerMock();

      const errorMessages = ['Any Error 1', 'Any Error 2'];

      const responseObject = {
        statusCode: HTTPStatusCode.BadRequest,
        error: {
          messages: errorMessages,
        },
      };

      expect(SUT.badRequestSpy(errorMessages)).toEqual(responseObject);
    });

    it('should return the expected `responseObject` when `serverError()` method is called', () => {
      const SUT = new ControllerMock();

      const responseObject = {
        statusCode: HTTPStatusCode.ServerError,
      };

      expect(SUT.serverErrorSpy()).toEqual(responseObject);
    });
  });
});
