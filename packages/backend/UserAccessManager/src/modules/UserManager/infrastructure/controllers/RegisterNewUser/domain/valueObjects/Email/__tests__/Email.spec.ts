import EmailFactory from '../Email';

describe('Module: UserManager', () => {
  describe('Email Value Object', () => {
    it('should return an error if is `email` is empty', () => {
      const emailValidatorMock = jest.fn();

      const SUT = new EmailFactory({
        emailValidator: emailValidatorMock,
      });

      const emailOrError = SUT.build({ email: '' });

      expect(emailOrError.error).toBe('[email] cannot be empty');
    });
  });
});
