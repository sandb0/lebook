export default {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  testMatch: ['**/*.(spec|test).ts'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
};
