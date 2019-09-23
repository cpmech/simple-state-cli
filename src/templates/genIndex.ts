const template = `import { Store } from './Store';

export const store = new Store();
`;

export const genIndex = (): string => {
  return template;
};
