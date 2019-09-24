import mustache from 'mustache';

const template = `export * from './{{name}}';
export * from './types';
`;

export const genModuleIndex = (name: string): string => {
  return mustache.render(template, {
    name,
  });
};
