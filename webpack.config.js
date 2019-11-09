module.exports = function (env, argv) {
  switch (argv.mode) {
    case 'production': {
      return require('./lib/webpack.prod.js');
      break;
    }
    case 'development': {
      return require('./lib/webpack.dev.js');
      break;
    }
    default: {
      break;
    }
  }
}