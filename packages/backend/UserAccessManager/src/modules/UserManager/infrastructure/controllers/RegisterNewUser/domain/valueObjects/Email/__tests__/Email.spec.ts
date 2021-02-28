import EmailFactory from '../Email';

describe('Module: UserManager', () => {
  describe('Email Value Object', () => {
    it('should return an error message if `email` is empty', () => {
      const EmailValidatorMock = jest.fn(() => ({
        isEmail: jest.fn().mockReturnValue(false),
      }));

      const emailValidatorMock = new EmailValidatorMock();

      const SUT = new EmailFactory({
        emailValidator: emailValidatorMock,
      });

      const emailOrError = SUT.build({ email: '' });

      expect(emailOrError.error).toBe('[email] cannot be empty');
    });

    it('should return an error message if `email` is invalid', () => {
      const EmailValidatorMock = jest.fn(() => ({
        isEmail: jest.fn().mockReturnValue(false),
      }));

      const emailValidatorMock = new EmailValidatorMock();

      const SUT = new EmailFactory({
        emailValidator: emailValidatorMock,
      });

      const email = 'INVALID';
      const emailOrError = SUT.build({ email });

      expect(emailOrError.error).toBe(`[email] "${email}" is invalid`);
      expect(emailValidatorMock.isEmail).toBeCalledTimes(1);
      expect(emailValidatorMock.isEmail).toBeCalledWith(email);
    });
  });
});
