import mustache from 'mustache';

const template = `export * from './{{klass}}';
export * from './types';
`;

export const genModuleIndex = (name: string, klass: string): string => {
  return mustache.render(template, {
    name,
    klass,
  });
};
