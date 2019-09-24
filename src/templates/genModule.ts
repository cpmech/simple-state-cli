import mustache from 'mustache';

const template = `// tslint:disable: member-ordering

import { makeGetField, makeSetField } from '@cpmech/basic/dist/esm/pure';
import { newState{{klass}} } from './types';

export class {{klass}} {
  readonly state = newState{{klass}}();

  // the constructor takes onChange() that is called whenever the state is changed
  constructor(readonly onChange: () => void) {}

  // getters /////////////////////////////////////////////////////////////////////////////////////

  getBooleanField = makeGetField<boolean>(this.state, 'boolean');
  getNumberField = makeGetField<number>(this.state, 'number');
  getStringField = makeGetField<string>(this.state, 'string');

  // setters /////////////////////////////////////////////////////////////////////////////////////

  setBooleanField = makeSetField<boolean>(this.state, this.onChange, 'boolean');
  setNumberField = makeSetField<number>(this.state, this.onChange, 'number');
  setStringField = makeSetField<string>(this.state, this.onChange, 'string');

  resetWithoutCallingOnChange = () => {
    for (const [key, value] of Object.entries(newState{{klass}}())) {
      (this.state as any)[key] = value;
    }
  };
}
`;

export const genModule = (name: string, klass: string): string => {
  return mustache.render(template, {
    name,
    klass,
  });
};
