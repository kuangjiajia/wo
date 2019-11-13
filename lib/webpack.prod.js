const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = webpackEnv => {

  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';
  return merge(baseConfig(webpackEnv), {
    devtool: 'inline-source-map',
    plugins: [
      new CleanWebpackPlugin(),
    ]
  });
}

module.exports = config;