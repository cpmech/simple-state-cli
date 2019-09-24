import { Data } from '../Data';
import { newStateData } from '../types';

class Notifier {
  names: string[] = [];
  observers = [() => this.names.push('bender'), () => this.names.push('leela')];
  onChange = () => this.observers.forEach(observer => observer());
}

describe('Data', () => {
  const notifier = new Notifier();
  const data = new Data(notifier.onChange);

  beforeEach(() => data.reset());

  describe('state', () => {
    it('should be properly initialized', () => {
      expect(data.state).toEqual({ ...newStateData() });
    });
  });

  describe('constructor', () => {
    it('should bind to the correct onChange function', () => {
      data.onChange();
      expect(notifier.names).toEqual(['bender', 'leela']);
    });
  });

  describe('reset', () => {
    it('should clear the state to the original values', () => {
      data.setStringField('outputDirectory', '/tmp/just-testing');
      expect(data.state.outputDirectory).toBe('/tmp/just-testing');
      data.reset();
      expect(data.state.outputDirectory).toBe('/tmp/simple-state/store');
    });
  });

  describe('getters', () => {
    it('should get the right values', () => {
      expect(data.getBooleanField('someBoolean')).toBeTruthy();
      expect(data.getNumberField('someNumber')).toBe(123);
      expect(data.getStringField('outputDirectory')).toBe('/tmp/simple-state/store');
      expect(data.getModuleNamesArray()).toEqual(['auth', 'user']);
    });

    it('should throw error on wrong fieldName', () => {
      expect(() => data.getStringField('__inexistent__')).toThrowError(
        'cannot find __inexistent__',
      );
    });

    it('should throw error on wrong type', () => {
      expect(() => data.getStringField('someNumber')).toThrowError(
        'type of someNumber is incorrect',
      );
    });
  });

  describe('setters', () => {
    it('should set the right values', () => {
      data.setStringField('outputDirectory', '/tmp/just-testing');
      expect(data.state.outputDirectory).toBe('/tmp/just-testing');
      data.pushModuleNames('hello world another one');
      expect(data.state.moduleNames).toBe('auth user hello world another one');
      data.removeModuleName('another');
      expect(data.state.moduleNames).toBe('auth user hello world one');
    });

    it('should throw error on wrong fieldName', () => {
      expect(() => data.setStringField('__inexistent__', 'value')).toThrowError(
        'cannot find __inexistent__',
      );
    });

    it('should throw error on wrong type', () => {
      expect(() => data.setStringField('someNumber', 'value')).toThrowError(
        'type of someNumber is incorrect',
      );
    });

    it('should call onChange', () => {
      notifier.names = [];
      data.setBooleanField('someBoolean', true);
      data.setNumberField('someNumber', 1);
      data.setStringField('outputDirectory', '/tmp/another-test');
      expect(notifier.names).toEqual(['bender', 'leela', 'bender', 'leela', 'bender', 'leela']);
    });
  });
});
