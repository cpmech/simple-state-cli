// tslint:disable: member-ordering

import { newStateData } from './types';
import { makeGetField, makeSetField } from '../auxiliary';

export class Data {
  readonly state = newStateData();

  // the constructor takes onChange() that is called whenever the state is changed
  constructor(readonly onChange: () => void) {}

  // getters /////////////////////////////////////////////////////////////////////////////////////

  getBooleanField = makeGetField<boolean>(this.state, 'boolean');
  getNumberField = makeGetField<number>(this.state, 'number');
  getStringField = makeGetField<string>(this.state, 'string');

  getModuleNamesArray = (): string[] => this.state.moduleNames.split(' ');

  // setters /////////////////////////////////////////////////////////////////////////////////////

  setBooleanField = makeSetField<boolean>(this.state, this.onChange, 'boolean');
  setNumberField = makeSetField<number>(this.state, this.onChange, 'number');
  setStringField = makeSetField<string>(this.state, this.onChange, 'string');

  pushModuleNames = (moduleNames: string) => {
    let changed = false;
    moduleNames.split(' ').forEach(name => {
      if (!this.state.moduleNames.includes(name)) {
        this.state.moduleNames += ` ${name}`;
        changed = true;
      }
    });
    if (changed) {
      this.onChange();
    }
  };

  removeModuleName = (moduleName: string) => {
    this.state.moduleNames = this.state.moduleNames
      .split(' ')
      .filter(name => name !== moduleName)
      .join(' ');
    this.onChange();
  };

  reset = () => {
    for (const [key, value] of Object.entries(newStateData())) {
      (this.state as any)[key] = value;
    }
  };
}
