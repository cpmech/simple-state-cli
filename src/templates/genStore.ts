import mustache from 'mustache';
import { camelize } from '@cpmech/basic';
import { store } from '../store';
import { IRender } from './types';

const template = `{{#modules}}
import { {{#cap}}{{.}}{{/cap}} } from './{{.}}';
{{/modules}}

// IObservers defines the object to hold all observers by name
interface IObservers {
  [name: string]: () => void;
}

// Store holds all state, organized within modules
export class Store {
  // observers holds everyone who is interested in state updates
  private observers: IObservers = {};

  // onChange notifies all observers that the state has been changed
  private onChange = () =>
    Object.keys(this.observers).forEach(name => this.observers[name] && this.observers[name]());

  //////////////////// modules go here ////////////////////////
{{#modules}}
  readonly {{.}} = new {{#cap}}{{.}}{{/cap}}(this.onChange);
{{/modules}}
  /////////////////////////////////////////////////////////////

  // subscribe adds someone to be notified about state updates
  // NOTE: returns a function to unsubscribe
  subscribe = (observer: () => void, name: string): (() => void) => {
    this.observers[name] = observer;
    return () => {
      delete this.observers[name];
    };
  };

  // reset clears the state
  reset = (notifyObservers: boolean = true) => {
    //////////////////// modules go here ////////////////////////
{{#modules}}
    this.{{.}}.resetWithoutCallingOnChange();
{{/modules}}
    /////////////////////////////////////////////////////////////
    if (notifyObservers) {
      this.onChange();
    }
  };
}
`;

export const genStore = (): string => {
  return mustache.render(template, {
    modules: store.data.getModuleNamesArray(),
    cap: () => (t: string, r: IRender) => camelize(r(t), true),
  });
};
