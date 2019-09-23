import fs from 'fs-extra';
import path from 'path';

export const generate = async (opt: IStateOpt, dat: IStateDat) => {
  // check
  if (dat.outdir.trim().length < 1) {
    throw new Error(`outdir = "${dat.outdir}" is too small`);
  }
  if (dat.names.trim().length < 3) {
    throw new Error(`names = "${dat.names}" is too small`);
  }

  // create main directory
  try {
    const exists = await fs.pathExists(dat.outdir);
    if (!exists) {
      await fs.mkdirp(dat.outdir);
    }
  } catch (err) {
    throw new Error(`cannot create directory = "${dat.outdir}"`);
  }

  // names array
  const narray = dat.names.trim().split(' ');

  // generate store.ts
  let fp = path.join(dat.outdir, 'store.ts');
  try {
    await maybeWriteFile(opt.overwrite, fp, () => genStore(narray));
  } catch (err) {
    throw new Error(`cannot create file "${fp}"`);
  }

  // generate types.ts
  fp = path.join(dat.outdir, 'types.ts');
  try {
    await maybeWriteFile(opt.overwrite, fp, () => genTypes(narray));
  } catch (err) {
    throw new Error(`cannot create file "${fp}"`);
  }

  // base module
  if (!opt.skipBase) {
    // create module base directory
    const pbase = path.join(dat.outdir, 'base');
    try {
      const exists = await fs.pathExists(pbase);
      if (!exists) {
        await fs.mkdir(pbase);
      }
    } catch (err) {
      throw new Error(`cannot create directory = "${pbase}"`);
    }

    // generate module base
    fp = path.join(pbase, 'types.ts');
    try {
      await maybeWriteFile(opt.overwrite, fp, genModBaseTypes);
    } catch (err) {
      throw new Error(`cannot create file "${fp}"`);
    }
  }

  // generate modules
  for (const name of narray) {
    try {
      await genModule(opt, dat.outdir, name);
    } catch (err) {
      throw new Error(err.message);
    }
  }
};
