const illegalRe1 = /[^a-z0-9]/g;
const illegalRe2 = /[\/\?<>\\:\*\|":]/g;
const controlRe = /[\x00-\x1f\x80-\x9f]/g;
const reservedRe = /^\.+$/;
const trailingRe = /[\. ]+$/;

export const sanitizeFilename = (filename: string): string => {
  return filename
    .replace(illegalRe1, '')
    .replace(illegalRe2, '')
    .replace(controlRe, '')
    .replace(reservedRe, '')
    .replace(trailingRe, '')
    .toLocaleLowerCase();
};
