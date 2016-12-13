// webpack
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const path = require('path')
const webpackConfig = require('../webpack.config')

// live
const server = new WebpackDevServer(webpack(webpackConfig), {
  contentBase: path.resolve(__dirname, '../build'),
  hot: true,
  historyApiFallback: true,
  publicPath: '/',
  quiet: false,
  noInfo: false,
  inline: true,
  progress: true
})

server.listen(8080)
