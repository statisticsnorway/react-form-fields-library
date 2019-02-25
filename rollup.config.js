import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs()
  ],
  external: [
    'moment',
    'react',
    'react-datepicker',
    'react-dom',
    'react-scripts',
    'semantic-ui-css',
    'semantic-ui-react'
  ]
}
