import fsextra from 'fs-extra';
import path from 'path';
import { maybeWriteFile, camelize } from '@cpmech/basic';
import { genIndex, genStore, genModule, genModuleTypes, genModuleIndex } from './templates';
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

  // create directory
  try {
    const exists = fsextra.pathExistsSync(outdir);
    if (!exists) {
      fsextra.mkdirpSync(outdir);
    }
  } catch (err) {
    throw new Error(`cannot create directory = "${outdir}"`);
  }

  // generate index.ts
  let fp = path.join(outdir, 'index.ts');
  try {
    maybeWriteFile(options.overwrite, fp, genIndex);
  } catch (error) {
    throw new Error(`cannot create file "${fp}". ${error}`);
  }

  // generate Store.ts
  fp = path.join(outdir, 'Store.ts');
  try {
    maybeWriteFile(options.overwrite, fp, genStore);
  } catch (error) {
    throw new Error(`cannot create file "${fp}"`);
  }

  // generate modules
  names.forEach(dirName => {
    const name = camelize(dirName, true);
    const fpMod = path.join(outdir, `${dirName}/${name}.ts`);
    const fpTypes = path.join(outdir, `${dirName}/types.ts`);
    const fpIndex = path.join(outdir, `${dirName}/index.ts`);
    try {
      maybeWriteFile(options.overwrite, fpMod, () => genModule(name));
      maybeWriteFile(options.overwrite, fpTypes, () => genModuleTypes(name));
      maybeWriteFile(options.overwrite, fpIndex, () => genModuleIndex(name));
    } catch (error) {
      throw new Error(`cannot create file "${fp}"`);
    }
  });
};
