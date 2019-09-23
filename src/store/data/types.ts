export interface IStateData {
  outputDirectory: string; // output directory
  moduleNames: string; // names of modules separated by space; e.g. "auth user data flags"
}

// zero ///////////////////////////////////////////////////////

export const newStateData = (): IStateData => ({
  outputDirectory: '/tmp/streamx/store',
  moduleNames: 'auth user',
});
