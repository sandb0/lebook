import RegisterNewUserController from '../RegisterNewUserController';
import RegisterNewUser from '../../../../application/RegisterNewUser/RegisterNewUser';
import { AbstractResponse } from '../../../../../../abstractions/infrastructure/controllers';

describe('Module - UserManager', () => {
  describe('RegisterNewUserController', () => {
    it('should call RegisterNewUser Use Case with expected `requestObject`', () => {
      const RegisterNewUserMock = jest.fn<Partial<RegisterNewUser>, []>();
      const registerNewUserMock = new RegisterNewUserMock() as RegisterNewUser;
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

    it('should return an HTTP Status Code 500 (Server Error) if catch an error from Use Case', () => {
      const RegisterNewUserMock = jest.fn<Partial<RegisterNewUser>, []>();
      const registerNewUserMock = new RegisterNewUserMock() as RegisterNewUser;
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

      try {
        responseObject = SUT.execute(requestObject);
      } catch (error) {
        expect(responseObject.statusCode).toBe(500);
      }
    });
  });
});
