const merge = require('webpack-merge')
const webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const config = require('../config')
const utils = require('./utils')
const baseWebpackConfig = require('./webpack.base.conf')

const { dev } = config

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: dev.cssSourceMap }),
  },
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': dev.env,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin(),
  ],
})
