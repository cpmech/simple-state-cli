export interface IStateFlags {
  overwrite: boolean; // overwrite existent files
  generateProject: boolean; // generate npm project (for testing)
}

// zero ///////////////////////////////////////////////////////

export const newStateFlags = (): IStateFlags => ({
  overwrite: true,
  generateProject: true,
});

export const zeroStateFlags = newStateFlags();
