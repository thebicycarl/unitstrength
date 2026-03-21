import path from 'node:path';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [react()],
	root: __dirname,
	publicDir: path.resolve(__dirname, '../public'),
	server: {
		port: 5174,
		cors: true,
	},
	build: {
		outDir: path.resolve(__dirname, '../dist-luxury'),
		emptyOutDir: true,
	},
	resolve: {
		extensions: ['.jsx', '.js', '.tsx', '.ts', '.json'],
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});

