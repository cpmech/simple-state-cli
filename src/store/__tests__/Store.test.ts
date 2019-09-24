import { Store } from '../Store';
import { newStateData } from '../data';

describe('Store', () => {
  describe('constructor', () => {
    const store = new Store();
    it('should bind to the correct onChange function', () => {
      let outDir = '';
      const observer = (s: Store) => {
        outDir = s.data.state.outputDirectory;
      };
      const unsubscribe = store.subscribe(observer);
      store.data.pushModuleName('todo');
      expect(outDir).toBe(newStateData().outputDirectory);
      unsubscribe();
    });
  });

  describe('data', () => {
    const store = new Store();
    it('should be properly initialized', () => {
      expect(store.data.state).toEqual({ ...newStateData() });
    });
  });

  describe('observers', () => {
    const store = new Store();
    let called = false;
    const unsubscribe = store.subscribe((s: Store) => (called = !called));
    it('should call everyone', () => {
      store.data.setStringField('moduleNames', 'a b c');
      expect(called).toBeTruthy();
    });

    it('should be properly unsubscribed', () => {
      unsubscribe();
      expect(called).toBeTruthy();
      store.data.setStringField('moduleNames', 'A B C D');
      expect(called).toBeTruthy();
    });
  });

  describe('reset', () => {
    const store = new Store();
    store.data.setStringField('moduleNames', 'hello world');
    store.reset();
    it('clears all state', () => {
      expect(store.data.state).toEqual({ ...newStateData() });
    });
  });
});
