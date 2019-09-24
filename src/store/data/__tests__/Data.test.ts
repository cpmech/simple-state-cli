import { Data } from '../Data';
import { newStateData } from '../types';

class Notifier {
  counter: number[] = [];
  observers = [() => this.counter.push(this.counter.length)];
  onChange = () => this.observers.forEach(observer => observer());
}

const notifier = new Notifier();
const data = new Data(notifier.onChange);
const refState = newStateData();

beforeEach(() => {
  notifier.counter = [];
  data.reset();
});

describe('Data', () => {
  describe('state', () => {
    it('should be properly initialized', () => {
      expect(data.state).toEqual(refState);
    });
  });

  describe('constructor', () => {
    it('should bind to the correct onChange function', () => {
      data.onChange();
      expect(notifier.counter).toEqual([0]);
    });
  });

  describe('reset', () => {
    it('should clear the state to the original values', () => {
      data.setStringField('outputDirectory', '/tmp/just-testing');
      expect(data.state.outputDirectory).toBe('/tmp/just-testing');
      data.reset();
      expect(data.state.outputDirectory).toBe(refState.outputDirectory);
    });
  });

  describe('getters', () => {
    it('should get the right values', () => {
      expect(data.getBooleanField('someBoolean')).toBeTruthy();
      expect(data.getNumberField('someNumber')).toBe(123);
      expect(data.getStringField('outputDirectory')).toBe(refState.outputDirectory);
      expect(data.getModuleNamesArray()).toEqual(['auth', 'user']);
    });

    it('should throw error on wrong fieldName', () => {
      expect(() => data.getStringField('__none__')).toThrowError('cannot find __none__');
    });

    it('should throw error on wrong type', () => {
      expect(() => data.getStringField('someNumber')).toThrowError(
        'type of someNumber is incorrect',
      );
    });
  });

  describe('setters', () => {
    it('should set the right values', () => {
      data.setBooleanField('someBoolean', false);
      data.setNumberField('someNumber', 666);
      data.setStringField('outputDirectory', '/tmp/just-testing');
      expect(data.state.someBoolean).toBeFalsy();
      expect(data.state.someNumber).toBe(666);
      expect(data.state.outputDirectory).toBe('/tmp/just-testing');
      expect(notifier.counter).toEqual([0, 1, 2]);
      data.pushModuleNames('hello world another one');
      expect(data.state.moduleNames).toBe('auth user hello world another one');
      expect(notifier.counter).toEqual([0, 1, 2, 3]);
      data.removeModuleName('another');
      expect(data.state.moduleNames).toBe('auth user hello world one');
      expect(notifier.counter).toEqual([0, 1, 2, 3, 4]);
    });

    it('should throw error on wrong fieldName', () => {
      expect(() => data.setBooleanField('__none__', false)).toThrowError('cannot find __none__');
      expect(() => data.setNumberField('__none__', 0)).toThrowError('cannot find __none__');
      expect(() => data.setStringField('__none__', 'value')).toThrowError('cannot find __none__');
    });

    it('should throw error on wrong type', () => {
      expect(() => data.setBooleanField('outputDirectory', false)).toThrowError(
        'type of outputDirectory is incorrect',
      );
      expect(() => data.setNumberField('someBoolean', 0)).toThrowError(
        'type of someBoolean is incorrect',
      );
      expect(() => data.setStringField('someNumber', 'v')).toThrowError(
        'type of someNumber is incorrect',
      );
    });

    it('should call onChange', () => {
      data.setBooleanField('someBoolean', false);
      data.setNumberField('someNumber', 666);
      data.setStringField('outputDirectory', '/tmp/another-test');
      expect(notifier.counter).toEqual([0, 1, 2]);
    });

    it('should not call onChange', () => {
      data.setBooleanField('someBoolean', true);
      data.setNumberField('someNumber', 123);
      data.setStringField('outputDirectory', refState.outputDirectory);
      expect(notifier.counter).toEqual([]);
    });
  });
});
