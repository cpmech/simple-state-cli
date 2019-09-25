import mustache from 'mustache';

const template = `import { Store, store, IObserver } from './store';

const logger: IObserver = (store: Store) =>
  console.log(JSON.stringify(store, undefined, 2));

store.subscribe(logger);

store.{{name}}.setBooleanField('someBoolean', true);
`;

export const genSrcIndex = (name: string, klass: string): string => {
  return mustache.render(template, {
    name,
    klass,
  });
};
