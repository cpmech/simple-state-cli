// tslint:disable: member-ordering

import { Data } from './data';
import { Flags } from './flags';

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
  readonly data = new Data(this.onChange);
  readonly flags = new Flags(this.onChange);
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
    this.data.resetWithoutCallingOnChange();
    this.flags.resetWithoutCallingOnChange();
    /////////////////////////////////////////////////////////////
    if (notifyObservers) {
      this.onChange();
    }
  };
}
