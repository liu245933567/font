const { smart } = require('webpack-merge');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const base = require('./webpack.base');
const webpack = require('webpack');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = smart(base, {
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyjsWebpackPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsWebpackPlugin()
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('production')
    }),
    new webpack.BannerPlugin('当年明月在，曾照彩云归'),
    new CopyWebpackPlugin([
      {
        from: '../doc',
        to: '../dist'
      }
    ])
  ]
})