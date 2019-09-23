import { IStateData, newStateData } from './data';
import { IStateFlags, newStateFlags } from './flags';

export interface IState {
  version: string;
  updating: boolean;
  //////////////////// modules types go here ////////////////////////
  data: IStateData;
  flags: IStateFlags;
  //////////////////// modules types go here ////////////////////////
}

export type ISetter = (state: IState) => IState;

export type IObserver = (state: IState) => void;

// zero ///////////////////////////////////////////////////////

export const newState = (): IState => ({
  version: '0.1.0',
  updating: false,
  data: newStateData(),
  flags: newStateFlags(),
});
