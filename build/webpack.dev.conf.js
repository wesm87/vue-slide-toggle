const merge = require('webpack-merge')
const webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const config = require('../config')
const baseWebpackConfig = require('./webpack.base.conf')

const { dev } = config

module.exports = merge(baseWebpackConfig, {
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': dev.env,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin(),
  ],
})
