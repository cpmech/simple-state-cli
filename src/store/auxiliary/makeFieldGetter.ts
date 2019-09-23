import { Store } from '../Store';

export const makeFieldGetter = <T>(
  store: Store,
  moduleName: string,
): ((fieldName: string) => T) => (fieldName: string): T => {
  if (!Object.prototype.hasOwnProperty.call(store.state, moduleName)) {
    throw new Error(`cannot find module "${moduleName}" in state`);
  }

  const moduleState = (store.state as any)[moduleName];

  if (!Object.prototype.hasOwnProperty.call(moduleState, fieldName)) {
    throw new Error(`cannot find field "${fieldName}" in module state "${moduleName}"`);
  }

  return (moduleState as any)[fieldName] as T;
};
