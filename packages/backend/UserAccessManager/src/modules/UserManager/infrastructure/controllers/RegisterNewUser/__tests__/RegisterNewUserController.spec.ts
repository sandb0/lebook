import RegisterNewUserController from '../RegisterNewUserController';

import faker from 'faker';

describe('Module - UserManager', () => {
  describe('RegisterNewUserController', () => {
    it('should return HTTP Status Code 400 (Bad Request) if `fullName` is not provided', () => {
      const SUT = new RegisterNewUserController();

      const requestObject = {
        fullName: undefined,
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      const { statusCode, error } = SUT.execute(requestObject);

      expect(statusCode).toBe(400);
      expect(error?.type).toBe('InvalidRequestError');
      expect(error?.message).toBe('[fullName] cannot be empty');
    });

    it('should return HTTP Status Code 400 (Bad Request) if `email` is not provided', () => {
      const SUT = new RegisterNewUserController();

      const requestObject = {
        fullName: `${faker.name.firstName} ${faker.name.lastName}`,
        email: undefined,
        password: faker.internet.password(),
      };

      const { statusCode, error } = SUT.execute(requestObject);

      expect(statusCode).toBe(400);
      expect(error?.type).toBe('InvalidRequestError');
      expect(error?.message).toBe('[email] cannot be empty');
    });

    it('should return HTTP Status Code 400 (Bad Request) if `password` is not provided', () => {
      const SUT = new RegisterNewUserController();

      const requestObject = {
        fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: faker.internet.email(),
        password: undefined,
      };

      const { statusCode, error } = SUT.execute(requestObject);

      expect(statusCode).toBe(400);
      expect(error?.type).toBe('InvalidRequestError');
      expect(error?.message).toBe('[password] cannot be empty');
    });
  });
});
