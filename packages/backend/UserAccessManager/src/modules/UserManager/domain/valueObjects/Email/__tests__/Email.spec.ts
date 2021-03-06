import faker from 'faker';
import EmailFactory from '../EmailFactory';
import { IEmailValidator } from '../../../../../../libs/validators/EmailValidator';

describe('Module: UserManager', () => {
  describe('Email Value Object', () => {
    it('should set an error message if `email` is empty', () => {
      const EmailValidatorMock = jest.fn<Partial<IEmailValidator>, []>();
      const emailValidatorMock = new EmailValidatorMock() as IEmailValidator;

      const emailFactory = new EmailFactory({
        emailValidator: emailValidatorMock,
      });

      const email = undefined || '';

      const emailObject = emailFactory.create({ email });

      expect(emailObject.error).toBe('[email] cannot be empty');
    });

    it('should return an error message if `email` is invalid', () => {
      const EmailValidatorMock = jest.fn<Partial<IEmailValidator>, []>();
      const emailValidatorMock = new EmailValidatorMock() as IEmailValidator;
      emailValidatorMock.isEmail = jest.fn().mockReturnValue(false);

      const emailFactory = new EmailFactory({
        emailValidator: emailValidatorMock,
      });

      const email = 'INVALID';

      const emailObject = emailFactory.create({ email });

      expect(emailValidatorMock.isEmail).toBeCalledTimes(1);
      expect(emailValidatorMock.isEmail).toBeCalledWith(email);
      expect(emailObject.error).toBe(
        `[email] "${email}" must be a valid email`
      );
    });

    it('should return an `email` with lower case characters and trimmed', () => {
      const EmailValidatorMock = jest.fn<Partial<IEmailValidator>, []>();
      const emailValidatorMock = new EmailValidatorMock() as IEmailValidator;
      emailValidatorMock.isEmail = jest.fn().mockReturnValue(true);

      const emailFactory = new EmailFactory({
        emailValidator: emailValidatorMock,
      });

      const emailDestandardized = '   ' + faker.internet.email().toUpperCase();
      const emailStandardized = emailDestandardized.trim().toLowerCase();

      const emailObject = emailFactory.create({ email: emailDestandardized });

      expect(emailObject.email).toBe(emailStandardized);
    });
  });
});
