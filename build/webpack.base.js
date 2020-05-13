// const path = require("path");
// const webpack = require('webpack');
// const Happypack = require('happypack');
const {pathResolve} = require('./utils');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    home: pathResolve('src/app.js')
  },
  output: {
    filename: '[name].js',
    path: pathResolve('dist'),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          chunks: 'initial',
          minSize: 10,
          minChunks: 3
        },
        vendor: {
          priority: 1,
          test: /node_modules/,
          chunks: 'initial',
          minSize: 10,
          minChunks: 3
        }
      }
    }
  },
  externals: {
    jquery: "$"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: pathResolve('src/index.html'),
      filename: 'index.html'
    }),
    // new webpack.DllReferencePlugin({
    //   manifest: path.resolve(__dirname, 'dist', 'manifest.json')
    // }),
    new MiniCssExtractPlugin({
      filename: 'css/mian.css',
    }),
    new CleanWebpackPlugin(),
    // new Happypack({
    //   id: 'css',
    //   use: [
    //     MiniCssExtractPlugin.loader,
    //     'css-loader',
    //     'postcss-loader'
    //   ]
    // }),
    // new Happypack({
    //   id: 'js',
    //   use: [{
    //     loader: 'babel-loader',
    //     options: {
    //       presets: [
    //         '@babel/preset-env',
    //         '@babel/preset-react'
    //       ],
    //       plugins: [
    //         ["@babel/plugin-proposal-decorators", { "legacy": true }],
    //         ["@babel/plugin-proposal-class-properties", { "loose": true }],
    //         "@babel/plugin-transform-runtime"
    //       ]
    //     }
    //   }]
    // })
  ],
  // watch: true,
  // watchOptions: {},
  resolve: {
    modules: [
      pathResolve('node_modules')
    ],
    extensions: ['.js','.jsx', '.css', '.vue', '.less'],
    mainFields: ['style', 'main'],
    // mainFiles: [],
    alias: {
      bootstrap: 'bootstrap/dist/css/bootstrap.css',
      config: pathResolve('src/config/index.js'),
      http: pathResolve('src/http/index.js')
    }
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-withimg-loader'
      },
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'eslint-loader',
      //     options: {
      //       enforce: 'pre' //强制之前执行
      //     }
      //   }
      // },
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
                {libraryName: "antd", style: 'css'} // 移动端添加 "libraryName": "antd-mobile"
              ]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          // MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          // MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            // limit: 200 * 1024,
            limit: 1,
            esModule: false,
            outputPath: 'img/'
          }
        }
      }
    ]
  }
}