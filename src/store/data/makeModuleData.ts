import { Store } from '../Store';
import { makeGetStringField, makeGetModuleNamesArray } from './getters';
import { makeSetStringField, makePushModuleName, makeRemoveModuleName } from './setters';

export const makeModuleData = (store: Store) => ({
  getStringField: makeGetStringField(store),
  setStringField: makeSetStringField(store),
  getModuleNamesArray: makeGetModuleNamesArray(store),
  pushModuleName: makePushModuleName(store),
  removeModuleName: makeRemoveModuleName(store),
});
