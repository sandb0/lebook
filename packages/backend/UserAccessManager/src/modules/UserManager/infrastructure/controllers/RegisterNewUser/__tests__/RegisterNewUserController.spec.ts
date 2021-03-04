import RegisterNewUser from '../../../../application/RegisterNewUser/RegisterNewUser';
import RegisterNewUserController from '../RegisterNewUserController';

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
  });
});
