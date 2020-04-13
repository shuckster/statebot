const path = require('path')

module.exports = env => {
  const PRODUCTION = Boolean(env && env.production)
  const BROWSER = Boolean(env && env.BROWSER)

  let fileName = './statebot.js'
  let restConfig = {}

  if (!PRODUCTION) {
    restConfig = {
      mode: 'development',
      devtool: 'inline-source-map'
    }
    fileName = BROWSER
      ? './statebot.dev.browser.js'
      : './statebot.dev.js'
  }

  if (PRODUCTION) {
    restConfig = {
      mode: 'production'
    }
    fileName = BROWSER
      ? './statebot.min.browser.js'
      : './statebot.min.js'
  }

  // Hey, 5k is 5k, dude! Save the bytes...
  if (!BROWSER) {
    restConfig.externals = {
      events: {
        commonjs: 'events',
        commonjs2: 'events',
        amd: 'events',
        root: 'events'
      }
    }
  }

  return {
    mode: 'production',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: fileName,
      libraryTarget: 'umd',
      library: 'statebot'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    },
    ...restConfig
  }
}
