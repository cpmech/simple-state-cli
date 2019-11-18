import { makeGetField, makeSetField, copySimple } from '@cpmech/basic';
import { newStateFlags } from './types';

const zeroState = newStateFlags();

export class Flags {
  readonly state = newStateFlags();

  // the constructor takes onChange() that is called whenever the state is changed
  constructor(readonly onChange: () => void) {}

  // getters /////////////////////////////////////////////////////////////////////////////////////

  getBooleanField = makeGetField<boolean>(this.state, 'boolean');

  // setters /////////////////////////////////////////////////////////////////////////////////////

  setBooleanField = makeSetField<boolean>(this.state, this.onChange, 'boolean');

  resetWithoutCallingOnChange = () => {
    copySimple(this.state, zeroState);
  };
}
