import { Store } from '../../Store';
import { makeFieldGetter } from '../makeFieldGetter';

describe('makeFieldGetter', () => {
  const store = new Store();

  it('throws error if moduleName is incorrect', () => {
    const f = makeFieldGetter<string>(store, '__crazy_module__');
    expect(() => f('any')).toThrowError('cannot find module "__crazy_module__" in state');
  });
});
