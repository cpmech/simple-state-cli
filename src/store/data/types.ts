export interface IStateData {
  outputDirectory: string; // output directory
  moduleNames: string; // names of modules separated by space; e.g. "auth user data flags"
  someBoolean: boolean; // [TESTING ONLY]
  someNumber: number; // [TESTING ONLY]
}

// zero ///////////////////////////////////////////////////////

export const newStateData = (): IStateData => ({
  outputDirectory: '/tmp/simple-state',
  moduleNames: 'auth user',
  someBoolean: false,
  someNumber: 0,
});
