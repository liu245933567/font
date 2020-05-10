const { smart } = require('webpack-merge');
const base = require('./webpack.base');
const webpack = require('webpack');
const {pathResolve} = require('./utils');

module.exports = smart(base, {
  mode: 'development',
  devServer: {
    hot: true,
    port: 8200,
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
      }
    }
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