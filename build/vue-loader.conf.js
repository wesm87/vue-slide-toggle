const utils = require('./utils')
const config = require('../config')

const { build, dev } = config

const isProd = utils.isProd()

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProd ? build.productionSourceMap : dev.cssSourceMap,
    extract: isProd,
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href',
  },
}
