import mustache from 'mustache';

const template = `export interface IState{{klass}} {
  someBoolean: boolean;
  someNumber: number;
  someString: string;
}

// zero ///////////////////////////////////////////////////////

export const newState{{klass}} = (): IState{{klass}} => ({
  someBoolean: false,
  someNumber: 0,
  someString: '',
});
`;

export const genModuleTypes = (name: string, klass: string): string => {
  return mustache.render(template, {
    name,
    klass,
  });
};
