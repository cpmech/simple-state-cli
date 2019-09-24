// tslint:disable: member-ordering

import { Data } from './data';
import { Flags } from './flags';

// Store holds all state, organized within modules
export class Store {
  // observers holds everyone who is interested in state updates
  private observers: IObserver[] = [];

  // onChange notifies all observers that the state has been changed
  private onChange = () => this.observers.forEach(observer => observer(this));

  //////////////////// modules go here ////////////////////////
  readonly data = new Data(this.onChange);
  readonly flags = new Flags(this.onChange);
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
    this.data.resetWithoutCallingOnChange();
    this.flags.resetWithoutCallingOnChange();
    /////////////////////////////////////////////////////////////
    if (notifyObservers) {
      this.onChange();
    }
  };
}

// updating function
export type IObserver = (store: Store) => void;
