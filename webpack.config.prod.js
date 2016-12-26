var path = require('path');
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app')
var BUILD_PATH = path.resolve(ROOT_PATH, 'build')

module.exports = {
  entry: {
    bundle: path.resolve(APP_PATH, 'main.js')
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
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin('css/[name].css'), // 抽离css到单独的文件
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './temp/index.html'),
      favicon: path.resolve(__dirname, './favicon.ico'),
      filename: path.resolve(__dirname, './build/index.html')
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
