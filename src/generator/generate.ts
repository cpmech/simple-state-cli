import fs from 'fs-extra';
import path from 'path';
import mustache from 'mustache';
import { camelize } from '@cpmech/basic';
import { tStore } from './templates/Store.t';
import { store } from '../store';

type IRender = (text: string) => string;

export const generate = () => {
  const res = mustache.render(tStore, {
    modules: ['auth', 'user'],
    cap: () => (t: string, r: IRender) => camelize(r(t), true),
  });
  console.log(res);
};
