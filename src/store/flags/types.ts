export interface IStateFlags {
  skipBase: boolean; // skip generation of base module
  noControl: boolean; // state in modules will NOT extend IControl from module base
  overwrite: boolean; // overwrite existent files
}

// zero ///////////////////////////////////////////////////////

export const newStateFlags = (): IStateFlags => ({
  skipBase: false,
  noControl: false,
  overwrite: false,
});
