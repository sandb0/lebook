import RegisterNewUserController from '../RegisterNewUserController';

describe('Module - UserManager', () => {
  describe('RegisterNewUserController', () => {
    // Validate: Full Name, Email and Password.

    it('should return HTTP Status Code 400 (Bad Request) if `fullName` is not provided', () => {
      const SUT = new RegisterNewUserController();

      const requestObject = {
        email: '',
        password: '',
      };

      const { statusCode } = SUT.execute(requestObject);

      expect(statusCode).toBe(400);
    });
  });
});
