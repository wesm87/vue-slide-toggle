// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    productionSourceMap: false,
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
  },
  dev: {
    env: require('./dev.env'),
  },
}
