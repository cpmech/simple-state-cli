import mustache from 'mustache';

const template = `import { {{klass}} } from '../{{klass}}';
import { newState{{klass}} } from '../types';

class Notifier {
  counter: number = 0;
  observers = [() => this.counter++];
  onChange = () => this.observers.forEach(observer => observer());
}

const notifier = new Notifier();
const {{name}} = new {{klass}}(notifier.onChange);
const refState = newState{{klass}}();

beforeEach(() => {
  notifier.counter = 0;
  {{name}}.resetWithoutCallingOnChange();
});

describe('{{klass}}', () => {
  describe('state', () => {
    it('should be properly initialized', () => {
      expect({{name}}.state).toEqual(refState);
    });
  });

  describe('constructor', () => {
    it('should bind to the correct onChange function', () => {
      {{name}}.onChange();
      expect(notifier.counter).toBe(1);
    });
  });

  describe('reset', () => {
    it('should clear the state to the original values', () => {
      {{name}}.setBooleanField('someBoolean', true);
      expect({{name}}.state.someBoolean).toBeTruthy();
      {{name}}.resetWithoutCallingOnChange();
      expect({{name}}.state.someBoolean).toBeFalsy();
    });
  });

  describe('getters', () => {
    it('should get the right values', () => {
      expect({{name}}.getBooleanField('someBoolean')).toBeFalsy();
      expect({{name}}.getNumberField('someNumber')).toBe(0);
      expect({{name}}.getStringField('someString')).toBe(refState.someString);
    });

    it('should throw error on wrong fieldName', () => {
      expect(() => {{name}}.getStringField('__none__')).toThrowError('cannot find __none__');
    });

    it('should throw error on wrong type', () => {
      expect(() => {{name}}.getStringField('someNumber')).toThrowError(
        'type of someNumber is incorrect',
      );
    });
  });

  describe('setters', () => {
    it('should set the right values', () => {
      {{name}}.setBooleanField('someBoolean', true);
      {{name}}.setNumberField('someNumber', 666);
      {{name}}.setStringField('someString', 'just-testing');
      expect({{name}}.state.someBoolean).toBeTruthy();
      expect({{name}}.state.someNumber).toBe(666);
      expect({{name}}.state.someString).toBe('just-testing');
      expect(notifier.counter).toBe(3);
    });

    it('should throw error on wrong fieldName', () => {
      expect(() => {{name}}.setBooleanField('__none__', true)).toThrowError('cannot find __none__');
      expect(() => {{name}}.setNumberField('__none__', 123)).toThrowError('cannot find __none__');
      expect(() => {{name}}.setStringField('__none__', 'value')).toThrowError('cannot find __none__');
    });

    it('should throw error on wrong type', () => {
      expect(() => {{name}}.setBooleanField('someString', false)).toThrowError(
        'type of someString is incorrect',
      );
      expect(() => {{name}}.setNumberField('someBoolean', 0)).toThrowError(
        'type of someBoolean is incorrect',
      );
      expect(() => {{name}}.setStringField('someNumber', 'v')).toThrowError(
        'type of someNumber is incorrect',
      );
    });

    it('should call onChange', () => {
      {{name}}.setBooleanField('someBoolean', true);
      {{name}}.setNumberField('someNumber', 666);
      {{name}}.setStringField('someString', 'another-test');
      expect(notifier.counter).toBe(3);
    });

    it('should not call onChange', () => {
      {{name}}.setBooleanField('someBoolean', false);
      {{name}}.setNumberField('someNumber', 0);
      {{name}}.setStringField('someString', refState.someString);
      expect(notifier.counter).toBe(0);
    });
  });
});
`;

export const genModuleTest = (name: string, klass: string): string => {
  return mustache.render(template, {
    name,
    klass,
  });
};
