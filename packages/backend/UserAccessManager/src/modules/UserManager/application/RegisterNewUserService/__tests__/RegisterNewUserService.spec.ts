import faker from 'faker';
import ValueObjectValidationError from '../../../../../abstractions/application/Errors/ValueObjectValidationError';
import { EmailFactory } from '../../../domain/valueObjects/Email';
import RegisterNewUserService, {
  RegisterNewUserProps,
} from '../RegisterNewUserService';

describe('Module - UserManager', () => {
  describe('RegisterNewUserService', () => {
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

      new RegisterNewUserService(emailFactoryMock).execute(props);

      expect(emailFactoryMock.create).toBeCalledTimes(1);
      expect(emailFactoryMock.create).toBeCalledWith({ email });
    });

    it('should return an error if EmailFactory fail on creation', () => {
      const EmailFactoryMock = jest.fn<Partial<EmailFactory>, []>();
      const emailFactoryMock = new EmailFactoryMock() as EmailFactory;
      emailFactoryMock.create = jest.fn().mockReturnValue({
        error: 'Any Error',
      });

      const props: RegisterNewUserProps = {
        fullName: '',
        email: faker.internet.email(),
        password: '',
      };

      try {
        new RegisterNewUserService(emailFactoryMock).execute(props);
      } catch (error) {
        expect(error).toBeInstanceOf(ValueObjectValidationError);
      }

      expect.hasAssertions();
    });
  });
});
