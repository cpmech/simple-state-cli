import { genIndex, genStore } from './templates';
import { store } from './store';

export const generate = () => {
  // const outDir = store.data.outputDirectory
  console.log(genStore());
};
