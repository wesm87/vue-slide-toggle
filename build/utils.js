const ExtractTextPlugin = require('extract-text-webpack-plugin')

const isProd = () => process.env.NODE_ENV === 'production'

exports.isProd = isProd

exports.cssLoaders = (options = {}) => {
  const { extract, sourceMap } = options

  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: isProd(),
      sourceMap: options.sourceMap,
    },
  }

  // Generate loader string to be used with extract text plugin
  const generateLoaders = (loader, loaderOptions) => {
    const loaders = [cssLoader]

    if (loader) {
      loaders.push({
        loader: `${loader}-loader`,
        options: Object.assign({}, loaderOptions, {
          sourceMap,
        }),
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
      })
    }

    return ['vue-style-loader'].concat(loaders)
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    scss: generateLoaders('sass'),
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = (options) => {
  const output = []
  const loaders = exports.cssLoaders(options)

  Object.keys(loaders).forEach((extension) => {
    const loader = loaders[extension]

    output.push({
      test: new RegExp(`\\.${extension}$`),
      use: loader,
    })
  })

  return output
}
