import { Store } from '../../Store';
import { makeGetBooleanField } from '../getters';

describe('module flags: getters', () => {
  const store = new Store();
  const getBooleanField = makeGetBooleanField(store);

  it('makeGetBooleanField works', () => {
    expect(getBooleanField('skipBase')).toBe(false);
    expect(getBooleanField('noControl')).toBe(false);
    expect(getBooleanField('overwrite')).toBe(false);
  });

  it('getBooleanField throws error if fieldName is incorrect', () => {
    expect(() => getBooleanField('__inexistent__')).toThrowError(
      'cannot find field "__inexistent__" in module state "flags"',
    );
  });
});
