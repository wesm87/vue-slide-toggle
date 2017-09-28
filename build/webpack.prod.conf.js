const merge = require('webpack-merge')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const config = require('../config')
const utils = require('./utils')
const baseWebpackConfig = require('./webpack.base.conf')

const { build } = config
const { env } = build

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: build.productionSourceMap,
      extract: true,
    }),
  },
  devtool: build.productionSourceMap ? '#source-map' : false,
  output: {
    path: build.assetsRoot,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].js',
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      sourceMap: true,
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true,
      },
    }),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),
  ],
})

if (build.bundleAnalyzerReport) {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
