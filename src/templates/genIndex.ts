const template = `import { Store } from './Store';
export * from './Store';

/////////////////////////////////
// global store /////////////////
export const store = new Store();
/////////////////////////////////
/////////////////////////////////
`;

export const genIndex = (): string => {
  return template;
};
