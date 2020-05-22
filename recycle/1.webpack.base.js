const { DllReferencePlugin } = require('webpack');
// const Happypack = require('happypack');
const { pathResolve } = require('./utils');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  entry: {
    home: pathResolve('src/app.js')
  },
  output: {
    filename: '[name].[hash:8].js',
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
    new DllReferencePlugin({
      manifest: pathResolve('static/dll/vendor.manifest.json')
    }),
    new HardSourceWebpackPlugin(), // <- 直接加入这行代码就行,
    // 给定的 JS 或 CSS 文件添加到 webpack 配置的文件中，并将其放入资源列表 html webpack插件注入到生成的 html 中。
    // new HtmlWebpackIncludeAssetsPlugin({
    //   assets: ['dll/_dll_vendor.js'],
    //   append: false
    // }),
    // 给定的 JS 或 CSS 文件添加到 webpack 配置的文件中，并将其放入资源列表 html webpack插件注入到生成的 html 中。
    // new AddAssetHtmlPlugin([
    //   {
    //     // 要添加到编译中的文件的绝对路径
    //     filepath: pathResolve('static/dll/_dll_vendor.js'),
    //     outputPath: 'dll',
    //     publicPath: 'dll',
    //     includeSourcemap: false
    //   }
    // ]),
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
    extensions: ['.js', '.jsx', '.css', '.vue', '.less'],
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
                { libraryName: "antd", style: 'css' } // 移动端添加 "libraryName": "antd-mobile"
              ]
            ]
          }
        }
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