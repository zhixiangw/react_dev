'use strict'
let path = require('path');
let webpack = require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let ExtractTextPlugin = require('extract-text-webpack-plugin')

let ROOT_PATH = path.resolve(__dirname);
let APP_PATH = path.resolve(ROOT_PATH, 'app')
let BUILD_PATH = path.resolve(ROOT_PATH, 'build')

let staticBase = ''
let apiBase = 'http://localhost:3100/'

module.exports = {
  entry: {
    bundle: [
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8080',
      path.resolve(APP_PATH, 'main.js')
    ]
  },
  output: {
    path: BUILD_PATH,
    publicPath: '/',
    filename: 'js/[name].js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      include: APP_PATH,
      query: {
        presets: ['es2015', 'react']
      }
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css!autoprefixer')
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!sass')
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!less'),
      exclude: /node_modules/
    }, {
      test: /\.(jpg|png|gif)$/,
      loaders: ['url?limit=8192&name=img/[hash].[ext]'],
      exclude: /node_modules/
    }, {
      test: /\.(eot|ttf|woff|woff2|svg)\w*/,
      loader: 'file?name=fonts/[hash].[ext]'
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      __PRODUCTION__: false,
      __STATIC_BASE__: `"${staticBase}"`,
      __API_BASE__: `"${apiBase}"`,
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin('css/[name].css'), // 抽离css到单独的文件
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './temp/index.html'),
      favicon: path.resolve(__dirname, './favicon.ico'),
      filename: path.resolve(__dirname, './build/index.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./manifest.json')
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
      'react-router': path.resolve(__dirname, './node_modules/react-router'),
      'react-redux': path.resolve(__dirname, './node_modules/react-redux'),
      'react-router-redux': path.resolve(__dirname, './node_modules/react-router-redux'),
      classnames: path.resolve(__dirname, './node_modules/classnames'),
      immutable: path.resolve(__dirname, './node_modules/immutable'),
      antd: path.resolve(__dirname, './node_modules/antd')
    }
  }
}
