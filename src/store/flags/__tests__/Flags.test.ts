import { Flags } from '../Flags';
import { newStateFlags } from '../types';

class Notifier {
  counter: number[] = [];
  observers = [() => this.counter.push(this.counter.length)];
  onChange = () => this.observers.forEach(observer => observer());
}

const notifier = new Notifier();
const flags = new Flags(notifier.onChange);
const refState = newStateFlags();

beforeEach(() => {
  notifier.counter = [];
  flags.reset();
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
      expect(notifier.counter).toEqual([0]);
    });
  });

  describe('reset', () => {
    it('should clear the state to the original values', () => {
      flags.setBooleanField('skipBase', true);
      expect(flags.state.skipBase).toBeTruthy();
      flags.reset();
      expect(flags.state.skipBase).toBeFalsy();
    });
  });

  describe('getters', () => {
    it('should get the right values', () => {
      expect(flags.getBooleanField('skipBase')).toBeFalsy();
    });

    it('should throw error on wrong fieldName', () => {
      expect(() => flags.getBooleanField('__none__')).toThrowError('cannot find __none__');
    });
  });

  describe('setters', () => {
    it('should set the right values', () => {
      flags.setBooleanField('skipBase', true);
      expect(flags.state.skipBase).toBeTruthy();
      expect(notifier.counter).toEqual([0]);
    });

    it('should throw error on wrong fieldName', () => {
      expect(() => flags.setBooleanField('__none__', false)).toThrowError('cannot find __none__');
    });

    it('should call onChange', () => {
      flags.setBooleanField('skipBase', true);
      expect(notifier.counter).toEqual([0]);
    });

    it('should not call onChange', () => {
      flags.setBooleanField('skipBase', false);
      expect(notifier.counter).toEqual([]);
    });
  });
});
