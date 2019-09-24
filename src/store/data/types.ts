export interface IStateData {
  outputDirectory: string; // output directory
  moduleNames: string; // names of modules separated by space; e.g. "auth user data flags"
  someNumber: number; // [TESTING ONLY]
}

// zero ///////////////////////////////////////////////////////

export const newStateData = (): IStateData => ({
  outputDirectory: '/tmp/simple-state/store',
  moduleNames: 'auth user',
  someNumber: 1,
});
