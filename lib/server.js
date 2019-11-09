const webpack = require('./webpack');
const Koa = require('./koa');
const webpackMiddleware = require("./koa-webpack-dev-middleware");

const app = new Koa();
const config = require('./webpack.dev');
const compiler = webpack(config);

app.use(webpackMiddleware(compiler, {

}))

app.listen(8899, function () {
  console.log('Example app listening on port 3001!\n');
});