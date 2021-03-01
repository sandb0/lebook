import RegisterNewUser from '../../../../application/RegisterNewUser/RegisterNewUser';
import RegisterNewUserController from '../RegisterNewUserController';

/**
 * Qual a função do Controller:
 * - Receber qualquer tipo de dado.
 * - Chamar o UseCase.
 * - Retornar uma resposta de acordo com a resposta do UseCase.
 *
 * Como testar o Controller?
 * - Fazer o Mock do UseCase e testar a resposto do Controller para cada retorno do UseCase.
 * Isso é suficiente para garantir o funcionamento do Controller.
 */
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
