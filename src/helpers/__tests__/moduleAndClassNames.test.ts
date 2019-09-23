import { moduleAndClassNames } from '../moduleAndClassNames';

describe('moduleAndClassNames ', () => {
  it('should generate module and class names', async () => {
    expect(moduleAndClassNames('hello_world')).toEqual({
      m: 'helloWorld',
      c: 'HelloWorld',
    });
  });
});
