import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import generatePackageJson from 'rollup-plugin-generate-package-json';

import path from 'path';
import pkg from './package.json';

const directory = path.resolve(__dirname, './source');

const cjs = {
	exports: 'named',
	format: 'cjs',
};

const esm = {
	format: 'esm',
};

const getCJS = override => ({ ...cjs, ...override });
const getESM = override => ({ ...esm, ...override });

const commonPlugins = [
	json(),
	nodeResolve({
		browser: true,
	}),
	babel({
		babelrc: false,
		exclude: 'node_modules/**',
		presets: [['@babel/preset-react']]
	}),
	commonjs(),
	replace({
		__VERSION__: JSON.stringify(pkg.version),
	}),
];

const configBase = {
	external: id => !id.startsWith('\@') && !id.startsWith('.') && !id.startsWith('/'),
	plugins: commonPlugins,
};

const config = {
	...configBase,
	input: path.resolve(directory, 'index.js'),
	output: [
		getCJS({
			file: 'router/cjs/index.js'
		}),
		getESM({
			file: 'router/esm/index.js'
		}),
	],
	plugins: [
		...configBase.plugins,
		generatePackageJson({
			outputFolder: 'router',
			baseContents: pkg => ({
				main: 'cjs/index.js',
				module: 'esm/index.js',
			}),
		}),
	],
};

export default config;