// tslint:disable: member-ordering

import { makeGetField, makeSetField } from '@cpmech/basic';
import { newStateFlags } from './types';

export class Flags {
  readonly state = newStateFlags();

  // the constructor takes onChange() that is called whenever the state is changed
  constructor(readonly onChange: () => void) {}

  // getters /////////////////////////////////////////////////////////////////////////////////////

  getBooleanField = makeGetField<boolean>(this.state, 'boolean');

  // setters /////////////////////////////////////////////////////////////////////////////////////

  setBooleanField = makeSetField<boolean>(this.state, this.onChange, 'boolean');

  resetWithoutCallingOnChange = () => {
    const newState = newStateFlags();
    Object.keys(newState).forEach(key => ((this.state as any)[key] = (newState as any)[key]));
  };
}
