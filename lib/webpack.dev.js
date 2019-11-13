const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const paths = require('../config/paths');

const config = merge(baseConfig, {
  devServer: {
    port: 8899,
    hot: true,
    stats: 'errors-only'
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
})

// module.exports = config;


module.exports = webpackEnv => {
  const isEnvDevelopment = process.env.NODE_ENV === 'development';
  return {
    host: process.env.HOST,
    hot: true,
    publicPath: '/',
    contentBase: paths.appPublic,
    stats: 'errors-only',
    before(app, server) {

    },
  }
}