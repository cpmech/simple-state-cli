import mustache from 'mustache';
import { camelize } from '@cpmech/basic';
import { store } from '../store';
import { IRender } from './types';

const template = `{{#modules}}
import { IState{{#cap}}{{.}}{{/cap}}, newState{{#cap}}{{.}}{{/cap}} } from './{{.}}';
{{/modules}}

export interface IState {
  version: string;
  updating: boolean;
  //////////////////// modules types go here ////////////////////////
{{#modules}}
  {{.}}: IState{{#cap}}{{.}}{{/cap}};
{{/modules}}
  //////////////////// modules types go here ////////////////////////
}

export type ISetter = (state: IState) => IState;

export type IObserver = (state: IState) => void;

// zero ///////////////////////////////////////////////////////

export const newState = (): IState => ({
{{#modules}}
  {{.}}: newState{{#cap}}{{.}}{{/cap}}(),
{{/modules}}
});
`;

export const genTypes = (): string => {
  return mustache.render(template, {
    modules: store.data.getModuleNamesArray(),
    cap: () => (t: string, r: IRender) => camelize(r(t), true),
  });
};
