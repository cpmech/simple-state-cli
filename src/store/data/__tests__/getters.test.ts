import { Store } from '../../Store';
import { makeGetStringField, makeGetModuleNamesArray } from '../getters';

const refData = {
  outputDirectory: '/tmp/streamx/store',
  moduleNames: 'auth user',
};

describe('module data: getters', () => {
  const store = new Store();
  const getStringField = makeGetStringField(store);
  const getModuleNamesArray = makeGetModuleNamesArray(store);

  it('makeGetStringField works', () => {
    expect(getStringField('outputDirectory')).toBe(refData.outputDirectory);
    expect(getStringField('moduleNames')).toBe(refData.moduleNames);
  });

  it('makeGetModuleNamesArray works', () => {
    expect(getModuleNamesArray()).toEqual(['auth', 'user']);
  });

  it('getStringField throws error if fieldName is incorrect', () => {
    expect(() => getStringField('__inexistent__')).toThrowError(
      'cannot find field "__inexistent__" in module state "data"',
    );
  });
});
