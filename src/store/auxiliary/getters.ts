export const makeGetBooleanField = (obj: any, name: string) => (fieldName: string): boolean => {
  if (!Object.prototype.hasOwnProperty.call(obj, fieldName)) {
    throw new Error(`cannot find field ${fieldName} in ${name}`);
  }
  const value = obj[fieldName];
  if (typeof value !== 'boolean') {
    throw new Error(`type of field ${fieldName} in ${name} is incorrect`);
  }
  return value as boolean;
};

export const makeGetNumberField = (obj: any, name: string) => (fieldName: string): number => {
  if (!Object.prototype.hasOwnProperty.call(obj, fieldName)) {
    throw new Error(`cannot find field ${fieldName} in ${name}`);
  }
  const value = obj[fieldName];
  if (typeof value !== 'number') {
    throw new Error(`type of field ${fieldName} in ${name} is incorrect`);
  }
  return value as number;
};

export const makeGetStringField = (obj: any, name: string) => (fieldName: string): string => {
  if (!Object.prototype.hasOwnProperty.call(obj, fieldName)) {
    throw new Error(`cannot find field ${fieldName} in ${name}`);
  }
  const value = obj[fieldName];
  if (typeof value !== 'string') {
    throw new Error(`type of field ${fieldName} in ${name} is incorrect`);
  }
  return value as string;
};
