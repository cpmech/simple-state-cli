import mustache from 'mustache';

const template = `import { Store } from '../Store';
import { newState{{klass}} } from '../{{name}}';

class Notifier {
  counter: number = 0;
  observers = [() => this.counter++];
  onChange = () => this.observers.forEach(observer => observer());
}

const notifier = new Notifier();
const store = new Store();
const refState = newState{{klass}}();

beforeEach(() => {
  notifier.counter = 0;
  store.reset(false);
});

describe('Store', () => {
  describe('constructor', () => {
    it('should bind to the correct onChange function', () => {
      store.subscribe(notifier.onChange, 'notifier');
      store.{{name}}.onChange();
      expect(notifier.counter).toEqual(1);
    });
  });

  describe('state', () => {
    it('should be properly initialized', () => {
      expect(store.{{name}}.state).toEqual(refState);
      expect(notifier.counter).toBe(0);
    });
  });

  describe('observers', () => {
    it('should call observers', () => {
      store.{{name}}.setBooleanField('someBoolean', true);
      expect(notifier.counter).toBe(1);
    });

    it('should properly unsubscribe observers', () => {
      let called = 0;
      const unsubscribe = store.subscribe(() => called++, 'singleObserver');
      store.{{name}}.setBooleanField('someBoolean', true);
      expect(called).toBe(1);
      unsubscribe();
      expect(called).toBe(1);
      store.{{name}}.setBooleanField('someBoolean', true);
      expect(called).toBe(1);
    });

    it('should properly unsubscribe all observers', () => {
      const st = new Store();
      const obs1 = jest.fn();
      const obs2 = jest.fn();
      const obs3 = jest.fn();
      const obs4 = jest.fn();
      const unsubscribe1 = st.subscribe(obs1, 'obs1');
      const unsubscribe2 = st.subscribe(obs2, 'obs2');
      const unsubscribe3 = st.subscribe(obs3, 'obs3');
      const unsubscribe4 = st.subscribe(obs4, 'obs4');
      st.data.setBooleanField('someBoolean', true);
      expect(obs1).toBeCalledTimes(1);
      expect(obs2).toBeCalledTimes(1);
      expect(obs3).toBeCalledTimes(1);
      expect(obs4).toBeCalledTimes(1);
      unsubscribe1();
      unsubscribe2();
      st.data.setBooleanField('someBoolean', false);
      expect(obs1).toBeCalledTimes(1);
      expect(obs2).toBeCalledTimes(1);
      expect(obs3).toBeCalledTimes(2);
      expect(obs4).toBeCalledTimes(2);
      unsubscribe1(); // should do no harm
      unsubscribe4();
      st.data.setBooleanField('someBoolean', true);
      expect(obs1).toBeCalledTimes(1);
      expect(obs2).toBeCalledTimes(1);
      expect(obs3).toBeCalledTimes(3);
      expect(obs4).toBeCalledTimes(2);
      unsubscribe3();
      st.data.setBooleanField('someBoolean', false);
      expect(obs1).toBeCalledTimes(1);
      expect(obs2).toBeCalledTimes(1);
      expect(obs3).toBeCalledTimes(3);
      expect(obs4).toBeCalledTimes(2);
    });
  });

  describe('reset', () => {
    it('clears all state and notifies observers', () => {
      store.{{name}}.setBooleanField('someBoolean', true);
      expect(notifier.counter).toBe(1);
      store.reset();
      expect(store.{{name}}.state).toEqual(refState);
      expect(notifier.counter).toBe(2);
    });

    it('clears all state but does not notify observers', () => {
      store.{{name}}.setBooleanField('someBoolean', true);
      expect(notifier.counter).toBe(1);
      store.reset(false);
      expect(store.{{name}}.state).toEqual(refState);
      expect(notifier.counter).toBe(1);
    });
  });
});
`;

export const genStoreTest = (name: string, klass: string): string => {
  return mustache.render(template, {
    name,
    klass,
  });
};
