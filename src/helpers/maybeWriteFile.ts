import fs from 'fs-extra';

export const maybeWriteFile = async (
  overwrite: boolean,
  filepath: string,
  generator: () => string,
) => {
  if (!overwrite) {
    if (!fs.pathExistsSync(filepath)) {
      await fs.outputFile(filepath, generator());
    }
  } else {
    await fs.outputFile(filepath, generator());
  }
};
