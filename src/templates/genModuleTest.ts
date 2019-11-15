import mustache from 'mustache';

const template = `import { {{klass}} } from '../{{klass}}';
import { newState{{klass}} } from '../types';

const onChange = jest.fn();
const refState = newState{{klass}}();
const {{name}} = new {{klass}}(onChange);

describe('{{klass}}', () => {
  describe('state', () => {
    it('should be properly initialized', () => {
      expect({{name}}.state).toEqual(refState);
    });
  });

  describe('constructor', () => {
    it('should bind to the correct onChange function', () => {
      {{name}}.onChange();
      expect(onChange).toBeCalledTimes(1);
    });
  });

  describe('getters', () => {
    it('should get the right values', () => {
      expect({{name}}.getStringField('role')).toBe('NADA');
      expect(onChange).toBeCalledTimes(1);
    });
  });

  describe('setters', () => {
    it('should set the right values and call onChange', () => {
      expect({{name}}.state.role).toBe('NADA');
      {{name}}.setStringField('role', 'TESTER');
      expect({{name}}.state.role).toBe('TESTER');
      expect(onChange).toBeCalledTimes(2);
    });

    it('should not call onChange if there is no difference', () => {
      expect({{name}}.state.role).toBe('TESTER');
      {{name}}.setStringField('role', 'TESTER');
      expect({{name}}.state.role).toBe('TESTER');
      expect(onChange).toBeCalledTimes(2);
    });
  });

  describe('reset', () => {
    it('should clear the state to the original values', () => {
      {{name}}.resetWithoutCallingOnChange();
      expect({{name}}.state).toEqual(refState);
      expect(onChange).toBeCalledTimes(2);
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
