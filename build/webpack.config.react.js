const path = require("path");
const webpack = require('webpack');

module.exports = {
  entry: {
    react: ['react', 'react-dom']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: '_dll_[name]',
    //   libraryTarget: 'var'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '_dll_[name]',
      path: path.resolve(__dirname, 'dist', 'manifest.json')
    })
  ]
}