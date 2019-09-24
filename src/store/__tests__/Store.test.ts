import { Store } from '../Store';
import { newStateData } from '../data';

class Notifier {
  counter: number = 0;
  observers = [() => this.counter++];
  onChange = () => this.observers.forEach(observer => observer());
}

const notifier = new Notifier();
const store = new Store();
const refState = newStateData();

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

  describe('state', () => {
    it('should be properly initialized', () => {
      expect(store.data.state).toEqual(refState);
      expect(notifier.counter).toBe(0);
    });
  });

  describe('observers', () => {
    it('should call observers', () => {
      store.data.setBooleanField('someBoolean', true);
      expect(notifier.counter).toBe(1);
    });

    it('should properly unsubscribe observers', () => {
      let called = 0;
      const unsubscribe = store.subscribe((s: Store) => called++);
      store.data.setBooleanField('someBoolean', true);
      expect(called).toBe(1);
      unsubscribe();
      expect(called).toBe(1);
      store.data.setBooleanField('someBoolean', true);
      expect(called).toBe(1);
    });
  });

  describe('reset', () => {
    it('clears all state and notifies observers', () => {
      store.data.setBooleanField('someBoolean', true);
      expect(notifier.counter).toBe(1);
      store.reset();
      expect(store.data.state).toEqual(refState);
      expect(notifier.counter).toBe(2);
    });

    it('clears all state but does not notify observers', () => {
      store.data.setBooleanField('someBoolean', true);
      expect(notifier.counter).toBe(1);
      store.reset(false);
      expect(store.data.state).toEqual(refState);
      expect(notifier.counter).toBe(1);
    });
  });
});
