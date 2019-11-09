const path = require('path');
// const BASE_PATH = process.cwd();

const CONFIG_PATH = {
  mainEntry: path.resolve(__dirname, '../src/index'),
  printEntry: path.resolve(__dirname, '../src/print.js'),
  outPutDir: path.resolve(__dirname, '../dist'),
  templatePath: path.resolve(__dirname, '../index.html'),
  pubicPath: '/assets/'
}

module.exports = CONFIG_PATH;