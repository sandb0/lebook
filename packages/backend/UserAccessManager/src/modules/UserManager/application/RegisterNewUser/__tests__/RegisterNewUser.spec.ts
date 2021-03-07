import faker from 'faker';
import RegisterNewUser, { RegisterNewUserProps } from '../RegisterNewUser';
import { EmailFactory } from '../../../domain/valueObjects/Email';
import ValueObjectValidationError from '../../../../../abstractions/application/ValueObjectValidationError';

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
        email: faker.internet.email(),
        password: '',
      };

      const email = props.email;

      new RegisterNewUser(emailFactoryMock).execute(props);

      expect(emailFactoryMock.create).toBeCalledTimes(1);
      expect(emailFactoryMock.create).toBeCalledWith({ email });
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
      email: faker.internet.email(),
      password: '',
    };

    try {
      new RegisterNewUser(emailFactoryMock).execute(props);
    } catch (error) {
      expect(error).toBeInstanceOf(ValueObjectValidationError);
    }
  });
});
