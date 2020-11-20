import external from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import filesize from 'rollup-plugin-filesize'
import progress from 'rollup-plugin-progress'
import postcss from 'rollup-plugin-postcss'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  input: 'src/index.tsx',
  output: [
    {
      file: 'lib/index.js',
      format: 'es',
      sourcemap: false,
    },
  ],
  external: ['react', 'react-dom'],
  plugins: [
    external(),
    typescript(),
    postcss({
      minimize: true,
      modules: false,
      extensions: ['.css', '.scss', '.sass'],
    }),

    resolve(),

    terser(),

    filesize(),

    progress({
      clearLine: true,
    }),
  ],
}
