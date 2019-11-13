const chalk = require('chalk');
const fs = require('fs');
const webpack = require('webpack');
const configFactory = require('../lib/webpack.base');
const webpackDevServer = require('webpack-dev-server');
const createDevServerConfig = require('../lib/webpack.dev');

const {
  CONFIG_PATH,
} = require('../config/paths');

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

process.on('unhandledRejection', err => {
  throw err;
});


const PORT = parseInt(process.env.PORT, 10) || 7788;
const HOST = process.env.HOST || '127.0.0.1';


const baseConfig = configFactory('development');
const devConfig = createDevServerConfig();
const compiler = webpack(baseConfig);

// const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const appName = require(CONFIG_PATH.appPackageJson).name;
const useTypeScript = fs.existsSync(CONFIG_PATH.appTsConfig);

const server = new webpackDevServer(compiler, devConfig);

server.listen(PORT, 'localhost', () => {
  console.log(chalk.yellow(`server listen on port ${PORT}`));
});