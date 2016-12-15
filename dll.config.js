const webpack = require('webpack')

const vendors = [
  'react',
  'react-dom',
  'react-router',
  'antd',
  'immutable',
  'classnames',
  'react-router-redux',
  'react-redux'
]

module.exports = {
  output: {
    path: 'build/lib',
    filename: '[name].js',
    library: '[name]',
  },
  entry: {
    __lib___: vendors,
  },
  plugins: [
    new webpack.DllPlugin({
      path: 'manifest.json',
      name: '[name]',
      context: __dirname
    })
  ]
}
