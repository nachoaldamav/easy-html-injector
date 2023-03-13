import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: ['src/index.ts'],
  dts: true,
  splitting: true,
  clean: true,
  format: ['esm', 'cjs'],
  minify: true,
  sourcemap: true,
  target: 'es2019',
  tsconfig: 'tsconfig.json',
  outDir: 'dist',
});
