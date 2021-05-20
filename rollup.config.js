import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonJS from '@rollup/plugin-commonjs';

import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    { dir: 'dist', format: 'umd', name: 'svelte-imgix' },
    { file: pkg.module, format: 'es' }
  ],
  plugins: [typescript(), resolve(), commonJS()]
};
