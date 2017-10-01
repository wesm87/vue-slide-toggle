const merge = require('webpack-merge')
const webpack = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const config = require('../config')
const baseWebpackConfig = require('./webpack.base.conf')

const { build } = config
const { env } = build

const webpackConfig = merge(baseWebpackConfig, {
  devtool: build.productionSourceMap ? '#source-map' : false,
  output: {
    path: build.assetsRoot,
    filename: '[name].js',
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env,
    }),
    new webpack.optimize.UglifyJsPlugin(),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),
  ],
})

if (build.bundleAnalyzerReport) {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
