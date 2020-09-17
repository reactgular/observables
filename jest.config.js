module.exports = {
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  },
  verbose: true,
  bail: true,
  collectCoverageFrom: [
    './src/**/*.ts',
    '!./**/index.ts'
  ],
  roots: [
    './src'
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
};
