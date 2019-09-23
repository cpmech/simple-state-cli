import { Store } from '../Store';
import { makeFieldGetter } from '../auxiliary';

export const makeGetStringField = (store: Store) => makeFieldGetter<string>(store, 'data');

export const makeGetModuleNamesArray = (store: Store) => (): string[] =>
  store.state.data.moduleNames.split(' ');
