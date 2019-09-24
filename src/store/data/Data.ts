// tslint:disable: member-ordering

import { newStateData } from './types';
import {
  makeGetBooleanField,
  makeGetNumberField,
  makeGetStringField,
  makeSetBooleanField,
  makeSetNumberField,
  makeSetStringField,
} from '../auxiliary';

export class Data {
  readonly state = newStateData();

  // the constructor takes onChange() that is called whenever the state is changed
  constructor(readonly onChange: () => void) {}

  // getters /////////////////////////////////////////////////////////////////////////////////////

  getBooleanField = makeGetBooleanField(this.state, 'data');
  getNumberField = makeGetNumberField(this.state, 'data');
  getStringField = makeGetStringField(this.state, 'data');

  getModuleNamesArray = (): string[] => this.state.moduleNames.split(' ');

  // setters /////////////////////////////////////////////////////////////////////////////////////

  setBooleanField = makeSetBooleanField(this.state, 'data', this.onChange);
  setNumberField = makeSetNumberField(this.state, 'data', this.onChange);
  setStringField = makeSetStringField(this.state, 'data', this.onChange);

  pushModuleNames = (moduleNames: string) => {
    moduleNames.split(' ').forEach(name => {
      if (!this.state.moduleNames.includes(name)) {
        this.state.moduleNames += ` ${name}`;
      }
    });
    this.onChange();
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
