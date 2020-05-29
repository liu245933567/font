const { pathResolve } = require('./utils');
const alias = require('./alias');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  entry: {
    home: pathResolve('src/modules/cartoon/app.js')
  },
  output: {
    filename: 'js/[name].[hash:8].js',
    path: pathResolve('dist'),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          chunks: 'initial',
          minSize: 10,
          minChunks: 2
        },
        vendor: {
          priority: 1,
          test: /node_modules/,
          chunks: 'initial',
          minSize: 10,
          minChunks: 2
        }
      }
    }
  },
  externals: {
    jquery: "$"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: pathResolve('src/modules/cartoon/index.html'),
      filename: 'index.html',
      favicon: pathResolve('src/assets/favicon.ico')
    }),
    new HardSourceWebpackPlugin(),
    new CleanWebpackPlugin(),
  ],
  // watch: true,
  // watchOptions: {},
  resolve: {
    modules: [
      pathResolve('node_modules')
    ],
    extensions: ['.js', '.jsx', '.css', '.vue', '.less'],
    mainFields: ['style', 'main'],
    // mainFiles: [],
    alias
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-withimg-loader'
      },
      {
        test: /\.(js|jsx)$/,
        include: pathResolve('src'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose": true }],
              "@babel/plugin-transform-runtime",
              [
                "import",
                { libraryName: "antd", style: 'css' } // 移动端添加 "libraryName": "antd-mobile"
              ]
            ]
          }
        }
      },
      {
        test: /\.(png|jpg|gif|ttf|eot|svg|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10 * 1024,
            esModule: false,
            outputPath: 'img/'
          }
        }
      }
    ]
  }
}