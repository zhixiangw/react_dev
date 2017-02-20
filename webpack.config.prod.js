'use strict'
let path = require('path');
let webpack = require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let ExtractTextPlugin = require('extract-text-webpack-plugin')

let ROOT_PATH = path.resolve(__dirname);
let APP_PATH = path.resolve(ROOT_PATH, 'app')
let DIST_PATH = path.resolve(ROOT_PATH, 'dist')

let staticBase = '/car'

module.exports = {
  context: path.resolve(__dirname, '.'),
  entry: {
    bundle: path.resolve(APP_PATH, 'main.js')
  },
  output: {
    path: DIST_PATH,
    publicPath: `${staticBase}/`,
    filename: 'js/[name].[hash].js'
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
      __PRODUCTION__: true,
      __STATIC_BASE__: `"${staticBase}"`,
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin('css/[name].[hash].css'), // 抽离css到单独的文件
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './temp/index.prod.html'),
      favicon: path.resolve(__dirname, './favicon.ico'),
      filename: path.resolve(__dirname, './dist/index.html')
    }),
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
