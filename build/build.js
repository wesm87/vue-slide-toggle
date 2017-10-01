const checkVersions = require('./check-versions')

checkVersions()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const chalk = require('chalk')
const webpack = require('webpack')

const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()

const { build: { assetsRoot } } = config

const runWebpackBuild = () => {
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()

    if (err) {
      throw err
    }

    const statsOutput = stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    })

    process.stdout.write(`${statsOutput}\n\n`)

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
}

rm(assetsRoot, (err) => {
  if (err) {
    throw err
  }

  runWebpackBuild()
})
