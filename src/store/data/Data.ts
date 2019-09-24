import { newStateData } from './types';

export class Data {
  readonly state = newStateData();

  // the constructor takes onChange() that is called whenever the state is changed
  constructor(readonly onChange: () => void) {}

  // getters /////////////////////////////////////////////////////////////////////////////////////

  getStringField = (fieldName: string): string => {
    if (!Object.prototype.hasOwnProperty.call(this.state, fieldName)) {
      throw new Error(`cannot find field ${fieldName} in data state`);
    }
    const value = (this.state as any)[fieldName];
    if (typeof value !== 'string') {
      throw new Error(`type of field ${fieldName} in data state is incorrect`);
    }
    return value as string;
  };

  getBooleanField = (fieldName: string): boolean => {
    if (!Object.prototype.hasOwnProperty.call(this.state, fieldName)) {
      throw new Error(`cannot find field ${fieldName} in data state`);
    }
    const value = (this.state as any)[fieldName];
    if (typeof value !== 'boolean') {
      throw new Error(`type of field ${fieldName} in data state is incorrect`);
    }
    return value as boolean;
  };

  getNumberField = (fieldName: string): number => {
    if (!Object.prototype.hasOwnProperty.call(this.state, fieldName)) {
      throw new Error(`cannot find field ${fieldName} in data state`);
    }
    const value = (this.state as any)[fieldName];
    if (typeof value !== 'number') {
      throw new Error(`type of field ${fieldName} in data state is incorrect`);
    }
    return value as number;
  };

  getModuleNamesArray = (): string[] => this.state.moduleNames.split(' ');

  // setters /////////////////////////////////////////////////////////////////////////////////////

  setStringField = (fieldName: string, value: string) => {
    if (!Object.prototype.hasOwnProperty.call(this.state, fieldName)) {
      throw new Error(`cannot find field ${fieldName} in data state`);
    }
    const oldValue = (this.state as any)[fieldName];
    if (typeof oldValue !== 'string') {
      throw new Error(`type of field ${fieldName} in data state is incorrect`);
    }
    (this.state as any)[fieldName] = value;
    this.onChange();
  };

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
