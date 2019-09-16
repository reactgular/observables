module.exports = {
  verbose: true,
  bail: true,
  collectCoverageFrom: [
    './src/**/*.ts'
  ],
  roots: [
    './src'
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
};
