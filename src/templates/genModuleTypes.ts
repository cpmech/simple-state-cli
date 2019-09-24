import mustache from 'mustache';

const template = `export interface IState{{name}} {
  someBoolean: boolean;
  someNumber: number;
  someString: string;
}

// zero ///////////////////////////////////////////////////////

export const newState{{name}} = (): IState{{name}} => ({
  someBoolean: false,
  someNumber: 0,
  someString: '',
});
`;

export const genModuleTypes = (name: string): string => {
  return mustache.render(template, {
    name,
  });
};
