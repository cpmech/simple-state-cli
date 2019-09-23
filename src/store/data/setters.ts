import { Store } from '../Store';
import { makeFieldSetter } from '../auxiliary';
import { IState } from '../types';

export const makeSetStringField = (store: Store) => makeFieldSetter<string>(store, 'data');

export const makePushModuleName = (store: Store) => (moduleName: string) => {
  store.updateState(
    (state: IState): IState => ({
      ...state,
      data: {
        ...state.data,
        moduleNames: state.data.moduleNames += ` ${moduleName}`,
      },
    }),
  );
};

export const makeRemoveModuleName = (store: Store) => (moduleName: string) => {
  const array = store.data.getModuleNamesArray();
  const newValue = array.filter((name: string) => name !== moduleName).join(' ');
  store.updateState(
    (state: IState): IState => ({
      ...state,
      data: {
        ...state.data,
        moduleNames: newValue,
      },
    }),
  );
};
