const template = `module.exports = {
  preset: 'ts-jest',
  coverageDirectory: '/tmp/jest_coverage',
  testRegex: '((\\.|/)(test))\\.[jt]sx?$',
  testPathIgnorePatterns: ['/dist/', '/node_modules/', '/cdk.out/'],
};
`;

export const genJestConfig = (): string => {
  return template;
};
