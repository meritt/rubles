import { terser } from 'rollup-plugin-terser';
import pluginTypescript from '@rollup/plugin-typescript';
import pluginCommonjs from '@rollup/plugin-commonjs';
import pluginNodeResolve from '@rollup/plugin-node-resolve';
import dts from "rollup-plugin-dts";
import { babel } from '@rollup/plugin-babel';
import * as path from 'path';
import pkg from './package.json';

const moduleName = pkg.name.replace(/^@.*\//, '');
const inputFileName = 'src/index.ts';
const author = pkg.author;
const banner = `
  /**
   * @license
   * author: ${author}
   * ${moduleName}.js v${pkg.version}
   * Released under the ${pkg.license} license.
   */
`;

export default [
  {
    input: inputFileName,
    output: [
      {
        name: moduleName,
        file: pkg.browser,
        format: 'iife',
        sourcemap: 'inline',
        banner,
      },
      {
        name: moduleName,
        file: pkg.browser.replace('.js', '.min.js'),
        format: 'iife',
        sourcemap: 'inline',
        banner,
        plugins: [terser()],
      },
    ],
    plugins: [
      pluginTypescript(),
      pluginCommonjs({
        extensions: ['.js', '.ts'],
      }),
      babel({
        babelHelpers: 'bundled',
        configFile: path.resolve(__dirname, '.babelrc.js'),
      }),
      pluginNodeResolve({
        browser: true,
      }),
    ],
  },

  // ES
  {
    input: inputFileName,
    output: [
      {
        file: pkg.module,
        format: 'es',
        sourcemap: 'inline',
        banner,
        exports: 'named',
      },
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.devDependencies || {}),
    ],
    plugins: [
      pluginTypescript(),
      pluginCommonjs({
        extensions: ['.js', '.ts'],
      }),
      babel({
        babelHelpers: 'bundled',
        configFile: path.resolve(__dirname, '.babelrc.js'),
      }),
      pluginNodeResolve({
        browser: false,
      }),
    ],
  },

  // CommonJS
  {
    input: inputFileName,
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: 'inline',
        banner,
        exports: 'default',
      },
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.devDependencies || {}),
    ],
    plugins: [
      pluginTypescript({ tsconfig: "./tsconfig.json" }),
      pluginCommonjs({
        extensions: ['.js', '.ts'],
      }),
      babel({
        babelHelpers: 'bundled',
        configFile: path.resolve(__dirname, '.babelrc.js'),
      }),
      pluginNodeResolve({
        browser: false,
      }),
    ],
  },

  {
    input: "dist/src/index.d.ts",
    output: [{ file: `dist/index.d.ts`, format: "es" }],
    plugins: [dts()],
  },
];
