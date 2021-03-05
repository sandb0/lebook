import AbstractController, { HTTPStatusCode } from '../AbstractController';
import AbstractResponse from '../AbstractResponse';

type RequestObject = null;

class ControllerMock extends AbstractController<RequestObject> {
  public addErrorMessageSpy(errorMessage: string) {
    this.errorMessages.push(errorMessage);
  }

  public execute(): AbstractResponse {
    const response: AbstractResponse = {
      statusCode: HTTPStatusCode.Ok,
    };

    return response;
  }

  public okSpy() {
    return this.ok();
  }

  public badRequestSpy() {
    return this.badRequest();
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

    it('should return the expected `responseObject` when `badResponse()` method is called', () => {
      const SUT = new ControllerMock();
      SUT.addErrorMessageSpy('Any Error 1');
      SUT.addErrorMessageSpy('Any Error 2');

      const responseObject = {
        statusCode: HTTPStatusCode.BadRequest,
        error: {
          messages: ['Any Error 1', 'Any Error 2'],
        },
      };

      expect(SUT.badRequestSpy()).toEqual(responseObject);
    });

    it('should return the expected `responseObject` when `serverError()` method is called', () => {
      const SUT = new ControllerMock();
      SUT.addErrorMessageSpy('Any Error 1');
      SUT.addErrorMessageSpy('Any Error 2');

      const responseObject = {
        statusCode: HTTPStatusCode.ServerError,
        error: {
          messages: ['Any Error 1', 'Any Error 2'],
        },
      };

      expect(SUT.serverErrorSpy()).toEqual(responseObject);
    });
  });
});
