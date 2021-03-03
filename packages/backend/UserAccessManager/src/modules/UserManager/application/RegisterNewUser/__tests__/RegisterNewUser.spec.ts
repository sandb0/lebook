import EmailFactory from '../../../domain/valueObjects/Email/EmailFactory';
import RegisterNewUser, { RegisterNewUserProps } from '../RegisterNewUser';

describe('Module - UserManager', () => {
  describe('RegisterNewUser', () => {
    it('should call EmailFactory with expected email value', () => {
      const EmailFactoryMock = jest.fn<Partial<EmailFactory>, []>();
      const emailFactoryMock = new EmailFactoryMock() as EmailFactory;
      emailFactoryMock.create = jest.fn().mockReturnValue({
        error: '',
      });

      const props: RegisterNewUserProps = {
        fullName: '',
        email: '',
        password: '',
      };

      new RegisterNewUser(emailFactoryMock).execute(props);

      expect(emailFactoryMock.create).toBeCalledTimes(1);
      expect(emailFactoryMock.create).toBeCalledWith({ email: props.email });
    });
  });

  it('should return an error if EmailFactory fail on creation', () => {
    const EmailFactoryMock = jest.fn<Partial<EmailFactory>, []>();
    const emailFactoryMock = new EmailFactoryMock() as EmailFactory;
    emailFactoryMock.create = jest.fn().mockReturnValue({
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
