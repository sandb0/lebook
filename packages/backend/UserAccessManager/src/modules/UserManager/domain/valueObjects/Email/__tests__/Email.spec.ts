import EmailFactory, { IEmailValidator } from '../Email';

describe('Module: UserManager', () => {
  describe('Email Value Object', () => {
    it('should return an error message if `email` is empty', () => {
      const EmailValidatorMock = jest.fn<Partial<IEmailValidator>, []>();
      const emailValidatorMock = new EmailValidatorMock() as IEmailValidator;
      emailValidatorMock.isEmail = jest.fn();

      const email = undefined || '';

      const SUT = new EmailFactory({
        emailValidator: emailValidatorMock,
      }).build({ email });

      expect(SUT.error).toBe('[email] cannot be empty');
    });

    it('should return an error message if `email` is invalid', () => {
      const EmailValidatorMock = jest.fn<Partial<IEmailValidator>, []>();
      const emailValidatorMock = new EmailValidatorMock() as IEmailValidator;
      emailValidatorMock.isEmail = jest.fn(() => false);

      const email = 'INVALID';

      const SUT = new EmailFactory({
        emailValidator: emailValidatorMock,
      }).build({ email });

      expect(SUT.error).toBe(`[email] "${email}" must be a valid email`);
      expect(emailValidatorMock.isEmail).toBeCalledTimes(1);
      expect(emailValidatorMock.isEmail).toBeCalledWith(email);
    });
  });
});
