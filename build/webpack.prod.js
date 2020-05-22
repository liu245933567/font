const { smart } = require('webpack-merge');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const base = require('./webpack.base');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");

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

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('production')
    }),
    new MiniCssExtractPlugin({
      filename: 'css/mian.[hash:8].css',
      chunkFilename: 'css/[id].[hash:8].css',
      ignoreOrder: true
    }),
    new webpack.BannerPlugin('当年明月在，曾照彩云归'),
    // new CopyWebpackPlugin([
    //   {
    //     from: '../doc',
    //     to: '../dist'
    //   }
    // ])
  ]
})