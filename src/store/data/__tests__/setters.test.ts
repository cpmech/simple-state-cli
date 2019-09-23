import { Store } from '../../Store';
import { makeSetStringField, makePushModuleName, makeRemoveModuleName } from '../setters';

describe('module data: setters', () => {
  const store = new Store();
  const setStringField = makeSetStringField(store);
  const pushModuleName = makePushModuleName(store);
  const removeModuleName = makeRemoveModuleName(store);

  beforeEach(() => store.reset());

  it('makeSetStringField works', () => {
    setStringField('outputDirectory', '/tmp/streamx/somewhere-else');
    setStringField('moduleNames', 'todo login');
    expect(store.state.data.outputDirectory).toBe('/tmp/streamx/somewhere-else');
    expect(store.state.data.moduleNames).toBe('todo login');
  });

  it('setStringField throws error if fieldName is incorrect', () => {
    expect(() => setStringField('__inexistent__', 'hello')).toThrowError(
      'cannot find field "__inexistent__" in module state "data"',
    );
  });

  it('pushModuleName works', () => {
    pushModuleName('colors fonts');
    expect(store.state.data.moduleNames).toEqual('auth user colors fonts');
  });

  it('removeModuleName works', () => {
    removeModuleName('auth');
    expect(store.state.data.moduleNames).toEqual('user');
  });
});
