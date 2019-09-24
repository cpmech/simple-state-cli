import fsextra from 'fs-extra';
import path from 'path';
import { maybeWriteFile, camelize } from '@cpmech/basic';
import {
  genIndex,
  genStore,
  genStoreTest,
  genModule,
  genModuleTest,
  genModuleTypes,
  genModuleIndex,
} from './templates';
import { store } from './store';

export const generate = () => {
  // constants
  const outdir = store.data.state.outputDirectory.trim();
  const names = store.data.getModuleNamesArray();
  const options = store.flags.state;

  // check
  if (outdir.length < 3) {
    throw new Error('invalid output directory');
  }
  if (names.length < 1) {
    throw new Error('not enough module names');
  }
  names.forEach(name => {
    if (name.length < 3) {
      throw new Error('invalid module name');
    }
  });

  try {
    // create directory
    const exists = fsextra.pathExistsSync(outdir);
    if (!exists) {
      fsextra.mkdirpSync(outdir);
    }

    // generate index.ts
    let fp = path.join(outdir, 'index.ts');
    maybeWriteFile(options.overwrite, fp, genIndex);

    // generate Store.ts
    fp = path.join(outdir, 'Store.ts');
    maybeWriteFile(options.overwrite, fp, genStore);

    // generate Store.test.ts
    fp = path.join(outdir, '__tests__/Store.test.ts');
    maybeWriteFile(options.overwrite, fp, () => genStoreTest(names[0], camelize(names[0], true)));

    // generate modules
    names.forEach(name => {
      const klass = camelize(name, true);

      // generate module
      fp = path.join(outdir, `${name}/${klass}.ts`);
      maybeWriteFile(options.overwrite, fp, () => genModule(name, klass));

      // generate module test
      fp = path.join(outdir, `${name}/__tests__/${klass}.test.ts`);
      maybeWriteFile(options.overwrite, fp, () => genModuleTest(name, klass));

      // generate types
      fp = path.join(outdir, `${name}/types.ts`);
      maybeWriteFile(options.overwrite, fp, () => genModuleTypes(name, klass));

      // generate index
      fp = path.join(outdir, `${name}/index.ts`);
      maybeWriteFile(options.overwrite, fp, () => genModuleIndex(name, klass));
    });

    // errors
  } catch (error) {
    throw new Error(`ERROR: ${error}`);
  }
};
