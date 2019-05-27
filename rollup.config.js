import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

module.exports = {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    })
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
