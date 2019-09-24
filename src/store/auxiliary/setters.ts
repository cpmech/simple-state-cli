export const makeSetBooleanField = (obj: any, name: string, onChange: () => void) => (
  fieldName: string,
  value: boolean,
) => {
  if (!Object.prototype.hasOwnProperty.call(obj, fieldName)) {
    throw new Error(`cannot find field ${fieldName} in ${name}`);
  }
  const oldValue = obj[fieldName];
  if (typeof oldValue !== 'boolean') {
    throw new Error(`type of field ${fieldName} in ${name} is incorrect`);
  }
  obj[fieldName] = value;
  onChange();
};

export const makeSetNumberField = (obj: any, name: string, onChange: () => void) => (
  fieldName: string,
  value: number,
) => {
  if (!Object.prototype.hasOwnProperty.call(obj, fieldName)) {
    throw new Error(`cannot find field ${fieldName} in ${name}`);
  }
  const oldValue = obj[fieldName];
  if (typeof oldValue !== 'number') {
    throw new Error(`type of field ${fieldName} in ${name} is incorrect`);
  }
  obj[fieldName] = value;
  onChange();
};

export const makeSetStringField = (obj: any, name: string, onChange: () => void) => (
  fieldName: string,
  value: string,
) => {
  if (!Object.prototype.hasOwnProperty.call(obj, fieldName)) {
    throw new Error(`cannot find field ${fieldName} in ${name}`);
  }
  const oldValue = obj[fieldName];
  if (typeof oldValue !== 'string') {
    throw new Error(`type of field ${fieldName} in ${name} is incorrect`);
  }
  obj[fieldName] = value;
  onChange();
};
