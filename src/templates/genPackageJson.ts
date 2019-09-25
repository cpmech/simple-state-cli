import mustache from 'mustache';

const template = `{
  "name": "{{title}}",
  "version": "0.1.0",
  "license": "MIT",
  "scripts": {
    "start": "yarn build && node dist/index.js",
    "watch": "nodemon -e ts --exec yarn start",
    "build": "rm -rf dist && rollup --config rollup.config.js",
    "test": "jest --verbose",
    "tw": "jest --watch --verbose",
    "cov": "yarn build && jest --coverage",
    "integ": "jest -c jest.config-integ.js --verbose",
    "integw": "jest -c jest.config-integ.js --verbose --watch",
    "dist": "yarn build && yarn publish --access=public"
  },
  "main": "dist/index.js",
  "devDependencies": {
    "@types/jest": "^24.0.18",
    "@types/node": "^12.7.7",
    "jest": "^24.9.0",
    "prettier": "^1.18.2",
    "rollup": "^1.21.4",
    "rollup-plugin-auto-external": "^2.0.0",
    "rollup-plugin-commonjs": "^10.1.0",
    "rollup-plugin-node-resolve": "^5.2.0",
    "rollup-plugin-typescript2": "^0.24.2",
    "ts-jest": "^24.1.0",
    "ts-node": "^8.4.1",
    "tslint": "^5.20.0",
    "tslint-config-prettier": "^1.18.0",
    "typescript": "^3.6.3"
  },
  "dependencies": {
    "@cpmech/basic": "^1.1.10"
  }
}
`;

export const genPackageJson = (title: string = 'simplestatetest'): string => {
  return mustache.render(template, {
    title,
  });
};
