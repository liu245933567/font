const { smart } = require('webpack-merge');
const base = require('./webpack.base');
const webpack = require('webpack');
const {pathResolve, getIP} = require('./utils');

module.exports = smart(base, {
  mode: 'development',
  devServer: {
    // host: getIP(),
    host: 'dev.yanyuge.xyz',
    hot: true,
    port: 8200,
    disableHostCheck: true,
    overlay: true,
    // progress: true,
    contentBase: pathResolve('dist'),
    // before(app) {
    //   app.get('/api/user', (req, res) => {
    //     res.json({ name: '山川明月-before' })
    //   })
    // }
    proxy: {
      '/cartoon': {
        target: 'http://localhost:3000',
        // pathRewrite: {
        //   '/api': ''
        // }
      },
      '/user': {
        target: 'http://localhost:3000',
        // pathRewrite: {
        //   '/api': ''
        // }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'eslint-loader',
          options: {
            enforce: 'pre' //强制之前执行
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('development')
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
})