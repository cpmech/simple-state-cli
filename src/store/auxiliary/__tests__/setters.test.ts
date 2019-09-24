import { makeSetField } from '../setters';

describe('makeSetField', () => {
  const obj = {
    fieldBoolean: true,
    fieldNumber: 123,
    fieldString: 'myname',
  };

  let bFlag = 'original';
  let nFlag = 'original';
  let sFlag = 'original';
  const bChange = () => (bFlag = 'modified');
  const nChange = () => (nFlag = 'modified');
  const sChange = () => (sFlag = 'modified');

  const b = makeSetField<boolean>(obj, bChange, 'boolean');
  const n = makeSetField<number>(obj, nChange, 'number');
  const s = makeSetField<string>(obj, sChange, 'string');

  it('should set the value correctly', () => {
    b('fieldBoolean', false);
    n('fieldNumber', 666);
    s('fieldString', 'hello');
    expect(obj).toEqual({
      fieldBoolean: false,
      fieldNumber: 666,
      fieldString: 'hello',
    });
  });

  it('should throw error on none fieldName', () => {
    expect(() => b('__none__', false)).toThrowError('cannot find __none__');
    expect(() => n('__none__', 666)).toThrowError('cannot find __none__');
    expect(() => s('__none__', 'hello')).toThrowError('cannot find __none__');
  });

  it('should throw error on incorrect type', () => {
    expect(() => b('fieldString', false)).toThrowError('type of fieldString is incorrect');
    expect(() => n('fieldBoolean', 666)).toThrowError('type of fieldBoolean is incorrect');
    expect(() => s('fieldNumber', 'hello')).toThrowError('type of fieldNumber is incorrect');
  });
});
