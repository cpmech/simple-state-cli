import { Flags } from '../Flags';
import { newStateFlags } from '../types';

class Notifier {
  counter: number = 0;
  observers = [() => this.counter++];
  onChange = () => this.observers.forEach(observer => observer());
}

const notifier = new Notifier();
const flags = new Flags(notifier.onChange);
const refState = newStateFlags();

beforeEach(() => {
  notifier.counter = 0;
  flags.resetWithoutCallingOnChange();
});

describe('Flags', () => {
  describe('state', () => {
    it('should be properly initialized', () => {
      expect(flags.state).toEqual(refState);
    });
  });

  describe('constructor', () => {
    it('should bind to the correct onChange function', () => {
      flags.onChange();
      expect(notifier.counter).toBe(1);
    });
  });

  describe('reset', () => {
    it('should clear the state to the original values', () => {
      flags.setBooleanField('overwrite', false);
      expect(flags.state.overwrite).toBeFalsy();
      flags.resetWithoutCallingOnChange();
      expect(flags.state.overwrite).toBeTruthy();
    });
  });

  describe('getters', () => {
    it('should get the right values', () => {
      expect(flags.getBooleanField('overwrite')).toBeTruthy();
    });

    it('should throw error on wrong fieldName', () => {
      expect(() => flags.getBooleanField('__none__')).toThrowError('cannot find __none__');
    });
  });

  describe('setters', () => {
    it('should set the right values', () => {
      flags.setBooleanField('overwrite', false);
      expect(flags.state.overwrite).toBeFalsy();
      expect(notifier.counter).toBe(1);
    });

    it('should throw error on wrong fieldName', () => {
      expect(() => flags.setBooleanField('__none__', false)).toThrowError('cannot find __none__');
    });

    it('should call onChange', () => {
      flags.setBooleanField('overwrite', false);
      expect(notifier.counter).toBe(1);
    });

    it('should not call onChange', () => {
      flags.setBooleanField('overwrite', true);
      expect(notifier.counter).toBe(0);
    });
  });
});
