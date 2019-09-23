import { Store } from '../Store';
import { IState } from '../types';

export const makeFieldSetter = <T>(
  store: Store,
  moduleName: string,
): ((fieldName: string, value: T) => void) => (fieldName: string, value: T) => {
  store.updateState(
    (state: IState): IState => {
      if (!Object.prototype.hasOwnProperty.call(state, moduleName)) {
        throw new Error(`cannot find module "${moduleName}" in state`);
      }

      const moduleState = (state as any)[moduleName];
      if (!Object.prototype.hasOwnProperty.call(moduleState, fieldName)) {
        throw new Error(`cannot find field "${fieldName}" in module state "${moduleName}"`);
      }

      return {
        ...state,
        [moduleName]: {
          ...(state as any)[moduleName],
          [fieldName]: value,
        },
      };
    },
  );
};
