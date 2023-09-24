import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import dotenv from "rollup-plugin-dotenv";
import json from '@rollup/plugin-json';
import nodePolyfills from 'rollup-plugin-polyfill-node';

export default {
	input: 'src/index.ts',
	output: {
		name: 'server',
		file: 'api/index.js',
		format: 'cjs'
	},
	external: [
		'bcrypt',
		'cors',
		'dotenv',
		'express',
		'jsonwebtoken',
		'mongoose',
	],
	plugins: [
		resolve({ preferBuiltins: true }), 
		commonjs(),
        babel({ babelHelpers: 'bundled' }),
        typescript({ module: "ESNext" }),
		dotenv(),
		json(),
		nodePolyfills(),
    ]
};