import { Data } from '../Data';
import { newStateData } from '../types';

class Notifier {
  names: string[] = [];
  observers = [() => this.names.push('bender'), () => this.names.push('leela')];
  // constructor() {
  //   this.onChange = this.onChange.bind(this);
  // }
  onChange = () => {
    for (const observer of this.observers) {
      observer();
    }
  };
}

describe('Data', () => {
  const notifier = new Notifier();
  const data = new Data(notifier.onChange);

  describe('state', () => {
    it('should be properly initialized', () => {
      expect(data.state).toEqual({ ...newStateData() });
    });
  });

  describe('constructor', () => {
    it('should bind to the correct onChange function', () => {
      data.onChange();
      expect(notifier.names).toEqual(['bender', 'leela']);
    });
  });

  describe('getters', () => {
    it('should get the right values', () => {
      console.log('hi');
    });
  });
});
