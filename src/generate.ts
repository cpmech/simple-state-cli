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
  genSrcIndex,
  genJestConfig,
  genPackageJson,
  genRollupConfig,
} from './templates';
import { store } from './store';

export const generate = () => {
  // constants
  const outDir = store.data.state.outputDirectory.trim();
  const srcDir = path.join(outDir, 'src');
  const storeDir = path.join(outDir, 'src', 'store');
  const names = store.data.getModuleNamesArray();
  const options = store.flags.state;

  // check
  if (outDir.length < 3) {
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
    // create directories
    const exists = fsextra.pathExistsSync(storeDir);
    if (!exists) {
      fsextra.mkdirpSync(storeDir);
    }

    let fp = '';

    //////////// project (testing) /////////////////////////////

    if (options.generateProject) {
      // generate jest.config.js
      fp = path.join(outDir, 'jest.config.js');
      maybeWriteFile(options.overwrite, fp, () => genJestConfig());

      // generate rollup.config.js
      fp = path.join(outDir, 'rollup.config.js');
      maybeWriteFile(options.overwrite, fp, () => genRollupConfig());

      // generate package.json
      fp = path.join(outDir, 'package.json');
      maybeWriteFile(options.overwrite, fp, () => genPackageJson());

      // generate src/index.ts
      fp = path.join(srcDir, 'index.ts');
      maybeWriteFile(options.overwrite, fp, () => genSrcIndex(names[0], camelize(names[0], true)));
    }

    //////////// store /////////////////////////////////////////

    // generate index.ts
    fp = path.join(storeDir, 'index.ts');
    maybeWriteFile(options.overwrite, fp, genIndex);

    // generate Store.ts
    fp = path.join(storeDir, 'Store.ts');
    maybeWriteFile(options.overwrite, fp, genStore);

    // generate Store.test.ts
    fp = path.join(storeDir, '__tests__/Store.test.ts');
    maybeWriteFile(options.overwrite, fp, () => genStoreTest(names[0], camelize(names[0], true)));

    // generate modules
    names.forEach(name => {
      const klass = camelize(name, true);

      // generate module
      fp = path.join(storeDir, `${name}/${klass}.ts`);
      maybeWriteFile(options.overwrite, fp, () => genModule(name, klass));

      // generate module test
      fp = path.join(storeDir, `${name}/__tests__/${klass}.test.ts`);
      maybeWriteFile(options.overwrite, fp, () => genModuleTest(name, klass));

      // generate types
      fp = path.join(storeDir, `${name}/types.ts`);
      maybeWriteFile(options.overwrite, fp, () => genModuleTypes(name, klass));

      // generate index
      fp = path.join(storeDir, `${name}/index.ts`);
      maybeWriteFile(options.overwrite, fp, () => genModuleIndex(name, klass));
    });

    // errors
  } catch (error) {
    throw new Error(`ERROR: ${error}`);
  }
};
