process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

process.on('unhandledRejection', err => {
  throw err;
});

const path = require('path');
const chalk = require('chalk');
const fs = require('fs');
const webpack = require('webpack');
const paths = require('../config/paths');
const configFactory = require('../lib/webpack.prod');


const webpackProdutionConfig = configFactory('production');

function build() {
  if (process.env.NODE_PATH) {
    console.log(
      chalk.yellow(
        'Setting NODE_PATH to resolve modules absolutely has been deprecated in favor of setting baseUrl in jsconfig.json (or tsconfig.json if you are using TypeScript) and will be removed in a future major release of create-react-app.'
      )
    );
  }
  console.log(chalk.yellow('😂 😂 😂'));
  console.log('Creating an optimized production build...');
  const compiler = webpack(webpackProdutionConfig);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err);
      }
      resolve('build webpack success! 😂 😂 😂')
    });
  });
}

build()
  .then(res => {
    console.log(chalk.green(res));
  })
  .catch(err => {
    console.log(chalk.red(err));
  })