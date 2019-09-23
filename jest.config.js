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
    '!./**/index.ts',
    '!./src/umd.ts'
  ],
  roots: [
    './src'
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
};
