import { Store } from '../Store';
import { newStateData } from '../data';

class Notifier {
  counter: number = 0;
  observers = [() => this.counter++];
  onChange = () => this.observers.forEach(observer => observer());
}

const notifier = new Notifier();
const store = new Store();

beforeEach(() => {
  notifier.counter = 0;
  store.reset(false);
});

describe('Store', () => {
  describe('constructor', () => {
    it('should bind to the correct onChange function', () => {
      store.subscribe(notifier.onChange);
      store.data.onChange();
      expect(notifier.counter).toEqual(1);
    });
  });

  describe('data', () => {
    it('should be properly initialized', () => {
      expect(store.data.state).toEqual({ ...newStateData() });
      expect(notifier.counter).toBe(0);
    });
  });

  describe('observers', () => {
    it('should call observers', () => {
      store.data.setStringField('moduleNames', 'a b c');
      expect(notifier.counter).toBe(1);
    });

    it('should properly unsubscribe observers', () => {
      let called = 0;
      const unsubscribe = store.subscribe((s: Store) => called++);
      store.data.setStringField('moduleNames', 'a b c');
      expect(called).toBe(1);
      unsubscribe();
      expect(called).toBe(1);
      store.data.setStringField('moduleNames', 'A B C D');
      expect(called).toBe(1);
    });
  });

  describe('reset', () => {
    it('clears all state and notifies observers', () => {
      store.data.setStringField('moduleNames', 'hello world');
      expect(notifier.counter).toBe(1);
      store.reset();
      expect(store.data.state).toEqual({ ...newStateData() });
      expect(notifier.counter).toBe(2);
    });

    it('clears all state but does not notify observers', () => {
      store.data.setStringField('moduleNames', 'hello world');
      expect(notifier.counter).toBe(1);
      store.reset(false);
      expect(store.data.state).toEqual({ ...newStateData() });
      expect(notifier.counter).toBe(1);
    });
  });
});
