export interface IStateFlags {
  overwrite: boolean; // overwrite existent files
}

// zero ///////////////////////////////////////////////////////

export const newStateFlags = (): IStateFlags => ({
  overwrite: true,
});
