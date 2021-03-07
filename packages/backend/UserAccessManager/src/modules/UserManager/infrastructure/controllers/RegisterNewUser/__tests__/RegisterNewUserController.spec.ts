import {
  AbstractResponse,
  HTTPStatusCode,
} from '../../../../../../abstractions/infrastructure/controllers';
import ValueObjectValidationError from '../../../../../../abstractions/application/Errors/ValueObjectValidationError';
import RegisterNewUserController from '../RegisterNewUserController';
import RegisterNewUserService from '../../../../application/RegisterNewUserService/RegisterNewUserService';

describe('Module - UserManager', () => {
  describe('RegisterNewUserController', () => {
    it('should call RegisterNewUserService with expected `requestObject`', () => {
      const RegisterNewUserMock = jest.fn<
        Partial<RegisterNewUserService>,
        []
      >();
      const registerNewUserMock = new RegisterNewUserMock() as RegisterNewUserService;
      registerNewUserMock.execute = jest.fn();

      const SUT = new RegisterNewUserController(registerNewUserMock);

      const requestObject = {
        fullName: undefined || '',
        email: undefined || '',
        password: undefined || '',
      };

      SUT.execute(requestObject);

      expect(registerNewUserMock.execute).toBeCalledTimes(1);
      expect(registerNewUserMock.execute).toBeCalledWith(requestObject);
    });

    it('should return an HTTP Status Code 400 (Bad Request) if catch an `ValueObjectValidationError` error from the ApplicationService', () => {
      const RegisterNewUserMock = jest.fn<
        Partial<RegisterNewUserService>,
        []
      >();
      const registerNewUserMock = new RegisterNewUserMock() as RegisterNewUserService;

      const validationErrors = ['Validation Error 1', 'Validation Error 2'];

      registerNewUserMock.execute = jest.fn().mockImplementation(() => {
        throw new ValueObjectValidationError(validationErrors.join(','));
      });

      const SUT = new RegisterNewUserController(registerNewUserMock);

      const requestObject = {
        fullName: undefined || '',
        email: undefined || '',
        password: undefined || '',
      };

      let responseObject: AbstractResponse = {
        statusCode: 0,
      };

      responseObject = SUT.execute(requestObject);
      expect(responseObject.statusCode).toBe(HTTPStatusCode.BadRequest);
      expect(responseObject.error?.messages).toEqual(validationErrors);
    });

    it('should return an HTTP Status Code 500 (Server Error) if catch an `Error` error from the ApplicationService', () => {
      const RegisterNewUserMock = jest.fn<
        Partial<RegisterNewUserService>,
        []
      >();
      const registerNewUserMock = new RegisterNewUserMock() as RegisterNewUserService;
      registerNewUserMock.execute = jest.fn().mockImplementation(() => {
        throw new Error('Server Error');
      });

      const SUT = new RegisterNewUserController(registerNewUserMock);

      const requestObject = {
        fullName: undefined || '',
        email: undefined || '',
        password: undefined || '',
      };

      let responseObject: AbstractResponse = {
        statusCode: 0,
      };

      responseObject = SUT.execute(requestObject);
      expect(responseObject.statusCode).toBe(HTTPStatusCode.ServerError);
    });
  });
});
