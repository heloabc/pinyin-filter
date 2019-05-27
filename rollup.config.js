const babel = require('rollup-plugin-babel')

export default [
  {
    input: 'src/index.js',
    output: {
      name: 'Pinyin',
      file: 'dist/index.js',
      format: 'umd',
    },
    plugins: [
      babel({
        babelrc: false,
        presets: [['@babel/env', {
          targets: {
            chrome: "48",
          },
        }]]
      })
    ]
  }
]