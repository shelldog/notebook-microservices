/* Copyright(c) 2022-2023 Hajime - Kha Tran.
 *
 * Webpack configuration file for production.
 * */

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const dotenv = require('dotenv')
const webpack = require('webpack')
const fs = require('fs')

module.exports = ({ ENVIRONMENT }) => {
  // get the root path.
  const root = process.cwd()

  // read the env file.
  const basePath = root + '/.env'

  // concatonate the environment.
  const envPath = basePath + '.' + ENVIRONMENT

  // check if the file is exists, otherwise fall back to the production .env
  const finalPath = fs.existsSync(envPath) ? envPath : basePath

  // parse with dotenv.
  const envFile = dotenv.config({ path: finalPath }).parsed

  // return env objects.
  const envObj = Object.keys(envFile).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(envFile[next])
    return prev
  }, {})

  return require('./webpack.core.js')({
    // mode: for production.
    mode: 'production',

    // output: use chunkhash for better performance.
    output: {
      filename: '[name].[chunkhash].js',
    },

    // optimization: configuration minimize.
    optimization: {
      minimize: true,
      minimizer: [
        // optimization for JavaScript for better performance.
        new TerserPlugin({
          terserOptions: {
            compress: {
              comparisons: false,
            },
            parse: {},
            mangle: true,
            output: {
              comments: false,
              ascii_only: true,
            },
          },
          parallel: true,
        }),
      ],
    },

    // plugins: HtmlWebpackPlugin but with different configuration for production.
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(process.cwd(), 'public', 'index.html'),
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
      }),

      // DefinePlugin for reading environment variables.
      new webpack.DefinePlugin(envObj),
    ],

    // devtool: source-map is recommended.
    devtool: 'source-map',
  })
}
