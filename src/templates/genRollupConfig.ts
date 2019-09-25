const template = `import autoexternal from 'rollup-plugin-auto-external';
import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const cacheRoot = '/tmp/rollup_typescript_cache';

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'cjs'
    },
    plugins: [
      autoexternal(),
      typescript({
        cacheRoot,
        typescript: require('typescript'),
        tsconfigOverride: { compilerOptions: { declaration: false } }
      }),
      resolve({ preferBuiltins: true }),
      commonjs()
    ]
  }
];
`;

export const genRollupConfig = (): string => {
  return template;
};
