export const tStore = `import { ISetter, IObserver, newState } from './types';
{{#modules}}
import { makeModule{{#cap}}{{.}}{{/cap}} } from './{{.}}';
{{/modules}}

export class Store {
  //////////////////// modules getters and setters go here ////////////////////////
{{#modules}}
  readonly {{.}} = makeModule{{#cap}}{{.}}{{/cap}}(this);
{{/modules}}
  /////////////////////////////////////////////////////////////////////////////////

  // state returns the state (not to be modified)
  state = newState(); // <<< READONLY

  // observers holds everyone who is interested in state updates
  private observers: IObserver[] = [];

  // subscribe adds someone to be notified about state updates
  // NOTE: returns a function to unsubscribe
  subscribe(observer: IObserver): () => void {
    const index = this.observers.push(observer) - 1;
    return () => this.observers.splice(index, 1);
  }

  // reset clears the state
  reset() {
    this.state = newState();
  }

  //////////// internal ///////////////////////////////////////////////////////////

  // [internal] update modifies state
  // NOTE: this should NOT be called externally; use modules instead
  updateState(setter: ISetter) {
    this.state = setter(this.state);
    for (const observer of this.observers) {
      observer(this.state);
    }
  }
}
`;
