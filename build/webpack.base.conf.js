const path = require('path')
const eslintFriendlyFormatter = require('eslint-friendly-formatter')

const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

const { build } = config

const resolve = dir => path.join(__dirname, '..', dir)

const sourcePath = resolve('src')

module.exports = {
  entry: {
    main: './src/SlideToggle.vue',
  },
  output: {
    path: build.assetsRoot,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [sourcePath],
        options: {
          formatter: eslintFriendlyFormatter,
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [sourcePath],
        options: vueLoaderConfig,
      },
    ],
  },
}
