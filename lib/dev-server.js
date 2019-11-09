const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.base');
const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost',
}

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(8899, 'localhost', () => {
  console.log('server listen on port 8899');
});