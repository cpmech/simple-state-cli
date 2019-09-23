import { Store } from '../../Store';
import { makeFieldSetter } from '../makeFieldSetter';

describe('makeFieldSetter', () => {
  const store = new Store();

  it('throws error if moduleName is incorrect', () => {
    const f = makeFieldSetter<string>(store, '__crazy_module__');
    expect(() => f('any', 'any')).toThrowError('cannot find module "__crazy_module__" in state');
  });
});
