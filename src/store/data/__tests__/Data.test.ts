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
      expect(data.getStringField('outputDirectory')).toBe('/tmp/simple-state/store');
      expect(data.getStringField('moduleNames')).toBe('auth user');
      expect(data.getModuleNamesArray()).toEqual(['auth', 'user']);
    });

    it('should throw error on wrong fieldName', () => {
      expect(() => data.getStringField('__inexistent__')).toThrowError(
        'cannot find field __inexistent__ in data state',
      );
    });

    it('should throw error on wrong type', () => {
      expect(() => data.getStringField('someNumber')).toThrowError(
        'type of field someNumber in data state is incorrect',
      );
    });
  });

  describe('setters', () => {
    it('should set the right values', () => {
      data.setStringField('outputDirectory', '/tmp/just-testing');
      data.setStringField('moduleNames', 'hello world');
      expect(data.state.outputDirectory).toBe('/tmp/just-testing');
      expect(data.state.moduleNames).toBe('hello world');
      data.pushModuleNames('hello another one');
      expect(data.state.moduleNames).toBe('hello world another one');
      data.removeModuleName('another');
      expect(data.state.moduleNames).toBe('hello world one');
    });

    it('should throw error on wrong fieldName', () => {
      expect(() => data.setStringField('__inexistent__', 'value')).toThrowError(
        'cannot find field __inexistent__ in data state',
      );
    });

    it('should throw error on wrong type', () => {
      expect(() => data.setStringField('someNumber', 'value')).toThrowError(
        'type of field someNumber in data state is incorrect',
      );
    });
  });
});
