import mustache from 'mustache';

const template = `import { Store } from '../Store';
import { newState{{klass}} } from '../{{name}}';

const observer = jest.fn();
const refState = newState{{klass}}();
const store = new Store();

describe('Store', () => {
  describe('constructor', () => {
    it('should bind to the correct onChange function', () => {
      store.subscribe(observer, 'store-test-observer');
      store.{{name}}.onChange();
      expect(observer).toBeCalledTimes(1);
    });
  });

  describe('state', () => {
    it('should be properly initialized', () => {
      expect(store.{{name}}.state).toEqual(refState);
      expect(observer).toBeCalledTimes(1);
    });
  });

  describe('observers', () => {
    it('should call observers', () => {
      store.{{name}}.setStringField('role', 'TESTER');
      expect(observer).toBeCalledTimes(2);
    });

    it('should properly unsubscribe observers', () => {
      const temporaryObserver = jest.fn();
      const unsubscribe = store.subscribe(temporaryObserver, 'store-test-temporary-observer');
      store.{{name}}.setStringField('role', 'ADMIN');
      expect(temporaryObserver).toBeCalledTimes(1);
      expect(observer).toBeCalledTimes(3);
      unsubscribe();
      store.{{name}}.setStringField('role', 'TESTER');
      expect(temporaryObserver).toBeCalledTimes(1);
      expect(observer).toBeCalledTimes(4);
    });
  });

  describe('reset', () => {
    it('clears all state and notifies observers', () => {
      store.reset();
      expect(observer).toBeCalledTimes(5);
    });

    it('clears all state but does not notify observers', () => {
      store.reset(false);
      expect(observer).toBeCalledTimes(5);
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
