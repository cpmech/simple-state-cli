import { camelize } from '@cpmech/basic';

// moduleAndClassNames: returns module name (m) and class name (c)
export const moduleAndClassNames = (name: string): { m: string; c: string } => {
  return {
    m: camelize(name),
    c: camelize(name, true),
  };
};
