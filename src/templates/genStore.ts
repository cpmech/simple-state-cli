import mustache from 'mustache';
import { camelize } from '@cpmech/basic';
import { store } from '../store';
import { IRender } from './types';

const template = `// tslint:disable: member-ordering

{{#modules}}
import { {{#cap}}{{.}}{{/cap}} } from './{{.}}';
{{/modules}}

// Store holds all state, organized within modules
export class Store {
  // observers holds everyone who is interested in state updates
  private observers: IObserver[] = [];

  // onChange notifies all observers that the state has been changed
  private onChange = () => this.observers.forEach(observer => observer(this));

  //////////////////// modules go here ////////////////////////
{{#modules}}
  readonly {{.}} = new {{#cap}}{{.}}{{/cap}}(this.onChange);
{{/modules}}
  /////////////////////////////////////////////////////////////

  // subscribe adds someone to be notified about state updates
  // NOTE: returns a function to unsubscribe
  subscribe = (observer: IObserver): (() => void) => {
    const index = this.observers.push(observer) - 1;
    return () => this.observers.splice(index, 1);
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

// updating function
export type IObserver = (store: Store) => void;
`;

export const genStore = (): string => {
  return mustache.render(template, {
    modules: store.data.getModuleNamesArray(),
    cap: () => (t: string, r: IRender) => camelize(r(t), true),
  });
};
