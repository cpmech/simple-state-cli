import { Data } from '../Data';
import { newStateData } from '../types';

class Notifier {
  counter: number = 0;
  observers = [() => this.counter++];
  onChange = () => this.observers.forEach(observer => observer());
}

const notifier = new Notifier();
const data = new Data(notifier.onChange);
const refState = newStateData();

beforeEach(() => {
  notifier.counter = 0;
  data.resetWithoutCallingOnChange();
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
      expect(notifier.counter).toBe(1);
    });
  });

  describe('reset', () => {
    it('should clear the state to the original values', () => {
      data.setStringField('outputDirectory', '/tmp/just-testing');
      expect(data.state.outputDirectory).toBe('/tmp/just-testing');
      data.resetWithoutCallingOnChange();
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
      expect(notifier.counter).toBe(3);
      data.pushModuleNames('hello world another one');
      expect(data.state.moduleNames).toBe('auth user hello world another one');
      expect(notifier.counter).toBe(4);
      data.removeModuleName('another');
      expect(data.state.moduleNames).toBe('auth user hello world one');
      expect(notifier.counter).toBe(5);
    });

    it('should not push moduleName if existent', () => {
      data.pushModuleNames('auth');
      expect(data.state.moduleNames).toBe('auth user');
      expect(notifier.counter).toBe(0);
    });

    it('should not call onChange when removing module if nothing is changed', () => {
      data.removeModuleName('blah');
      expect(data.state.moduleNames).toBe('auth user');
      expect(notifier.counter).toBe(0);
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
      expect(notifier.counter).toBe(3);
    });

    it('should not call onChange', () => {
      data.setBooleanField('someBoolean', true);
      data.setNumberField('someNumber', 123);
      data.setStringField('outputDirectory', refState.outputDirectory);
      expect(notifier.counter).toBe(0);
    });
  });
});
