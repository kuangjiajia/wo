const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = merge.smart(baseConfig, {
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(),
  ]
})

module.exports = config;