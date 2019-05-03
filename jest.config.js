module.exports = {
  testMatch: ['**/tests/**/*.js'],
  coverageDirectory: './coverage',
  collectCoverage: true,
  reporters: [ "default", "jest-junit" ]
};
