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
  env: resolveApp('.env'),
  appPath: resolveApp('.'),
  appSrc: resolveApp('src'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appBuild: resolveApp('build'),
  appPackageJson: resolveApp('package.json'),
  appTsConfig: resolveApp('tsconfig.json'),
  appIndexJs: resolveModule(resolveApp, 'src/index'),
  appTest: resolveApp('test'),
  appDist: resolveApp('dist'),
  appAssets: resolveApp('assets'),
  appOutputPublic: '/',
}

const ALIAS_PATH = {
  alias_constants: resolveApp('src/constants'),
  alias_redux: resolveApp('src/redux'),
  alias_components: resolveApp('src/components'),
  alias_utils: resolveApp('src/utils'),
  alias_actions: resolveApp('src/redux/actions'),
  alias_reducer: resolveApp('src/redux/reducer'),
}


module.exports = {
  CONFIG_PATH,
  ALIAS_PATH,
  moduleFileExtensions,
};