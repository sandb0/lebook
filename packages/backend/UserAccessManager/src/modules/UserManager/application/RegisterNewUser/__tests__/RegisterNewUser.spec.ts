import EmailFactory from '../../../domain/valueObjects/Email/Email';
import RegisterNewUser, { RegisterNewUserProps } from '../RegisterNewUser';

/**
 * - Chamar os Value Objects.
 * - Retornar um erro em cada de error dos ValuesObjects.
 */
describe('Module - UserManager', () => {
  describe('RegisterNewUser', () => {
    it('should call EmailFactory with expected email value', () => {
      const EmailFactoryMock = jest.fn<Partial<EmailFactory>, []>();
      const emailFactoryMock = new EmailFactoryMock() as EmailFactory;
      const ValueObjectCreation = jest.fn();

      emailFactoryMock.build = jest.fn(() => new ValueObjectCreation());

      const props: RegisterNewUserProps = {
        fullName: '',
        email: '',
        password: '',
      };

      new RegisterNewUser(emailFactoryMock).execute(props);

      expect(emailFactoryMock.build).toBeCalledTimes(1);
      expect(emailFactoryMock.build).toBeCalledWith({ email: props.email });
    });
  });

  it('should return an error if EmailFactory fail on creation', () => {
    const EmailFactoryMock = jest.fn<Partial<EmailFactory>, []>();
    const emailFactoryMock = new EmailFactoryMock() as EmailFactory;
    emailFactoryMock.build = jest.fn().mockReturnValue({
      error: '[email] cannot be empty',
    });

    const props: RegisterNewUserProps = {
      fullName: '',
      email: '',
      password: '',
    };

    const response = new RegisterNewUser(emailFactoryMock).execute(props);

    expect(response).toBe('[email] cannot be empty');
  });
});
