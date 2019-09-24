export interface IStateData {
  outputDirectory: string; // output directory
  moduleNames: string; // names of modules separated by space; e.g. "auth user data flags"
  someBoolean: boolean; // [TESTING ONLY]
  someNumber: number; // [TESTING ONLY]
}

// zero ///////////////////////////////////////////////////////

export const newStateData = (): IStateData => ({
  outputDirectory: '/tmp/simple-state/store',
  moduleNames: 'auth user',
  someBoolean: true,
  someNumber: 123,
});
