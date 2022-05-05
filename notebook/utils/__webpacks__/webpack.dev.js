/* Copyright(c) 2022-2023 Hajime - Kha Tran.
 *
 * Webpack configuration for development.
 *
 * */

const path = require('path')
const dotenv = require('dotenv')
const HtmlWebpackPlugin = require('html-webpack-plugin')
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

  // webpack init.
  return require('./webpack.core.js')({
    // tell the webpack this is for development.
    mode: 'development',

    // output: use chunk instead of hash for better performance.
    output: {
      filename: '[name].chunk.js',
    },

    // optimization: in development.
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },

    // plugins: in development.
    plugins: [
      // HtmlWebpackPlugin'll inject JavaScript codes into tags and put in HTML tag.
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(process.cwd(), 'public', 'index.html'),
      }),

      // DefinePlugin for reading environment variables.
      new webpack.DefinePlugin(envObj),
    ],

    // devtool: boot your development.
    devtool: 'inline-source-map',
  })
}
