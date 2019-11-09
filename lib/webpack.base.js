const CONFIG_PATH = require('../constants/baseConfig');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: CONFIG_PATH.mainEntry,
    // print: CONFIG_PATH.printEntry,
  },
  output: {
    filename: '[name].[hash:8].js',
    path: CONFIG_PATH.outPutDir,
    // publicPath: '/assets/',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                require('./autoprefixer')({
                  browsers: ['last 2 version', '> 1%'],
                })
              }
            }
          }
        ],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
      },
      {
        test: /\.tsx?$/,
        use: [
          'ts-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader',
        ]
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    // new HtmlWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'this is a html-webpack-pugin demo',
      template: CONFIG_PATH.templatePath,
      publicPath: '/assets/'
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new FriendlyWebpackPlugin(),
  ],
  /**
   * 用于输出日志信息的
   */
  stats: 'errors-only'
}