import { Store } from '../../Store';
import { makeSetBooleanField } from '../setters';

describe('module info: setters', () => {
  const store = new Store();
  const setBooleanField = makeSetBooleanField(store);

  beforeEach(() => store.reset());

  it('makeSetBooleanField works', () => {
    setBooleanField('skipBase', true);
    setBooleanField('noControl', true);
    expect(store.state.flags.skipBase).toBeTruthy();
    expect(store.state.flags.noControl).toBeTruthy();
    expect(store.state.flags.overwrite).toBeFalsy();
  });

  it('setBooleanField throws error if fieldName is incorrect', () => {
    expect(() => setBooleanField('__inexistent__', true)).toThrowError(
      'cannot find field "__inexistent__" in module state "flags"',
    );
  });
});
