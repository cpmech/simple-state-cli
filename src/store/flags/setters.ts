import { Store } from '../Store';
import { makeFieldSetter } from '../auxiliary';

export const makeSetBooleanField = (store: Store) => makeFieldSetter<boolean>(store, 'flags');
