import { Store } from '../Store';
import { makeFieldGetter } from '../auxiliary';

export const makeGetBooleanField = (store: Store) => makeFieldGetter<boolean>(store, 'flags');
