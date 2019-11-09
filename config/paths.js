const path = require('path');
const fs = require('fs');

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];
const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = relativePath => path.join(appDirectory, relativePath);
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(ext =>
    fs.existsSync(resolveFn(`${filePath}.${ext}`))
  )
  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }
  return resolveFn(`${filePath}.js`);
}

const CONFIG_PATH = {
  mainEntry: resolveModule(resolveApp, 'src/index'),
  printEntry: resolveModule(resolveApp, 'src/print'),
  templatePath: resolveApp('public/index.html'),
  outPutDir: resolveApp('dist'),
  pubicPath: resolveApp('/assets/'),
  appSrc: resolveApp('src'),
  appPublic: resolveApp('public'),
}

module.exports = CONFIG_PATH;