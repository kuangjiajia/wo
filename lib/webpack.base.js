const isWsl = require('is-wsl');
const postcssNormalize = require('postcss-normalize');
const TerserPlugin = require('terser-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyWebpackPlugin = require('friendly-errors-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CONFIG_PATH, moduleFileExtensions, ALIAS_PATH } = require('../config/paths');
const path = require('path');


const CSS_OUTPUT_PATH = 'css';

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;




module.exports = (webpackEnv) => {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';

  const isEnvProductionProfile =
    isEnvProduction && process.argv.includes('--profile');
  function getStyleLoaders(cssOptions, preProcessor) {
    const loaders = [
      isEnvDevelopment && require.resolve('style-loader'),
      isEnvProduction && {
        loader: MiniCssExtractPlugin.loader,
        // options: shouldUseRelativeAssetPaths ? { publicPath: '../../' } : {},
      },
      {
        loader: require.resolve('css-loader'),
        options: cssOptions,
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            }),
            postcssNormalize(),
          ],
          sourceMap: isEnvProduction && shouldUseSourceMap,
        },
      },
    ].filter(Boolean);
    if (preProcessor) {
      loaders.push(
        {
          loader: require.resolve('resolve-url-loader'),
          options: {
            sourceMap: isEnvProduction && shouldUseSourceMap,
          },
        },
        {
          loader: require.resolve(preProcessor),
          options: {
            sourceMap: true,
          },
        }
      );
    }
    return loaders;
  }

  console.log({
    ...Object.entries(ALIAS_PATH).reduce((accumulator, currentValue) => {
      const props = `$${currentValue[0].split('_')[1]}`;
      accumulator[props] = currentValue[1];
      return accumulator;
    }, {})
  });
  console.log(moduleFileExtensions.map(ext => `.${ext}`));
  const config = {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    entry: {
      main: CONFIG_PATH.appIndexJs,
    },
    output: {
      path: CONFIG_PATH.appDist,
      pathinfo: isEnvDevelopment,
      filename: isEnvProduction
        ? 'js/[name].[contenthash:8].js'
        : isEnvDevelopment && 'js/bundle.js',
      // futureEmitAssets: true,
      chunkFilename: isEnvProduction
        ? 'js/[name].[contenthash:8].chunk.js'
        : isEnvDevelopment && 'js/[name].chunk.js',
      publicPath: CONFIG_PATH.appOutputPublic,
    },
    resolve: {
      extensions: moduleFileExtensions.map(ext => `.${ext}`),
      alias: {
        "@": CONFIG_PATH.appSrc,
        ...Object.entries(ALIAS_PATH).reduce((accumulator, currentValue) => {
          const props = `$${currentValue[0].split('_')[1]}`;
          accumulator[props] = currentValue[1];
          return accumulator;
        }, {})
      },
      modules: ['node_modules'],
    },
    module: {
      rules: [
        {
          test: cssRegex,
          exclude: cssModuleRegex,
          use: getStyleLoaders({
            importLoaders: 1,
            sourceMap: isEnvProduction && shouldUseSourceMap,
          }),
          sideEffects: true,
        },
        {
          test: lessRegex,
          exclude: lessModuleRegex,
          use: getStyleLoaders(
            {
              importLoaders: 2,
              sourceMap: isEnvProduction && shouldUseSourceMap,
            },
            'less-loader'
          ),
          sideEffects: true,
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/,
          loader: 'file-loader',
          options: {
            name: 'name_[hash:8].[ext]',
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          loader: 'file-loader',
        },
        {
          test: /\.tsx?$/,
          use: [
            'ts-loader'
          ],
          exclude: /node_modules/
        },
        {
          test: /\.jsx?$/,
          use: [
            'babel-loader',
          ]
        },
      ]
    },
    plugins: [
      // new HtmlWebpackPlugin(),
      new HtmlWebpackPlugin(
        Object.assign(
          {
            title: 'this is a html-webpack-pugin demo',
            template: CONFIG_PATH.appHtml,
            publicPath: '/assets/'
          },
          isEnvProduction
            ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
            }
            : {}
        )
      ),
      new webpack.DefinePlugin(env.stringified),
      isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // all options are optional
        filename: `${CSS_OUTPUT_PATH}/[name].[contenthash:8].css`,
        chunkFilename: `${CSS_OUTPUT_PATH}/[id].[contenthash:8].css`,
        ignoreOrder: false, // Enable to remove warnings about conflicting order
      }),
      new FriendlyWebpackPlugin(),
    ],
    /**
     * 用于输出日志信息的
     */
    stats: 'errors-only'
  }
  if (isEnvProduction) {
    config.optimization = {
      minimize: isEnvProduction,
      minimizer: [
        // This is only used in production mode
        new TerserPlugin({
          terserOptions: {
            parse: {
              // We want terser to parse ecma 8 code. However, we don't want it
              // to apply any minification steps that turns valid ecma 5 code
              // into invalid ecma 5 code. This is why the 'compress' and 'output'
              // sections only apply transformations that are ecma 5 safe
              // https://github.com/facebook/create-react-app/pull/4234
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              // Disabled because of an issue with Uglify breaking seemingly valid code:
              // https://github.com/facebook/create-react-app/issues/2376
              // Pending further investigation:
              // https://github.com/mishoo/UglifyJS2/issues/2011
              comparisons: false,
              // Disabled because of an issue with Terser breaking valid code:
              // https://github.com/facebook/create-react-app/issues/5250
              // Pending further investigation:
              // https://github.com/terser-js/terser/issues/120
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            // Added for profiling in devtools
            keep_classnames: isEnvProductionProfile,
            keep_fnames: isEnvProductionProfile,
            output: {
              ecma: 5,
              comments: false,
              // Turned on because emoji and regex is not minified properly using default
              // https://github.com/facebook/create-react-app/issues/2488
              ascii_only: true,
            },
          },
          // Use multi-process parallel running to improve the build speed
          // Default number of concurrent runs: os.cpus().length - 1
          // Disabled on WSL (Windows Subsystem for Linux) due to an issue with Terser
          // https://github.com/webpack-contrib/terser-webpack-plugin/issues/21
          parallel: !isWsl,
          // Enable file caching
          cache: true,
          sourceMap: shouldUseSourceMap,
        }),
        // This is only used in production mode
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            parser: safePostCssParser,
            map: shouldUseSourceMap
              ? {
                // `inline: false` forces the sourcemap to be output into a
                // separate file
                inline: false,
                // `annotation: true` appends the sourceMappingURL to the end of
                // the css file, helping the browser find the sourcemap
                annotation: true,
              }
              : false,
          },
        }),
      ],
      splitChunks: {
        chunks: 'all',
        name: false,
      },
      // Keep the runtime chunk separated to enable long term caching
      // https://twitter.com/wSokra/status/969679223278505985
      // https://github.com/facebook/create-react-app/issues/5358
      runtimeChunk: {
        name: entrypoint => `runtime-${entrypoint.name}`,
      },
    }
  }
  return config;
}