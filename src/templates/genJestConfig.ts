const template = `module.exports = {
  preset: 'ts-jest',
  coverageDirectory: '/tmp/jest_coverage',
  testRegex: '((\\.|/)(test))\\.[jt]sx?$',
  testPathIgnorePatterns: ['/dist/', '/node_modules/', '/cdk.out/'],
  moduleNameMapper: {
    '^@cpmech/basic/dist/esm/pure$': '<rootDir>/node_modules/@cpmech/basic',
  },
};
`;

export const genJestConfig = (): string => {
  return template;
};
