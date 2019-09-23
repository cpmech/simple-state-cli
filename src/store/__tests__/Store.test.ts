import { Store } from '../Store';
import { newState, IObserver, IState } from '../types';

describe('Store', () => {
  it('creates successfully', () => {
    const store = new Store();
    expect(store.state).toEqual(newState());
  });

  it('subscribes observers properly', () => {
    const store = new Store();
    let outDir = '';
    const update: IObserver = (state: IState) => {
      outDir = state.data.outputDirectory;
    };
    store.subscribe(update);
    store.data.setStringField('outputDirectory', '/tmp/just-testing');
    expect(outDir).toBe('/tmp/just-testing');
  });

  it('unsubscribes properly', () => {
    const store = new Store();
    let outDir = '';
    const update: IObserver = (state: IState) => {
      outDir = state.data.outputDirectory;
    };
    const unsubscribe = store.subscribe(update);
    store.data.setStringField('outputDirectory', '/tmp/just-testing');
    expect(outDir).toBe('/tmp/just-testing');
    unsubscribe();
    store.data.setStringField('outputDirectory', '/tmp/something-else');
    expect(outDir).toBe('/tmp/just-testing');
  });
});
