import { Store } from '../Store';
import { makeGetBooleanField } from './getters';
import { makeSetBooleanField } from './setters';

export const makeModuleFlags = (store: Store) => ({
  getBooleanField: makeGetBooleanField(store),
  setBooleanField: makeSetBooleanField(store),
});
