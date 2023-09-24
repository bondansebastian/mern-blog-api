import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import dotenv from "rollup-plugin-dotenv";
import json from '@rollup/plugin-json';

export default {
	input: 'src/index.ts',
	output: {
		name: 'index',
		file: 'dist/index.js',
		format: 'iife'
	},
	plugins: [
        resolve({ preferBuiltins: true }), 
		commonjs(),
        babel({ babelHelpers: 'bundled' }),
        typescript({ module: "ESNext" }),
		dotenv(),
		json(),
    ]
};