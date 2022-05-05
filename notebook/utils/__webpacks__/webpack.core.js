/*
 * Standard configuration file for Webpacks.
 *
 * description: template for other webpack config files (production & development).
 * */

const path = require('path')

module.exports = config => ({
  // 2 modes: development or production.
  mode: config.mode,

  // entry: main entry directory holding the js, jsx files.
  entry: path.resolve(process.cwd(), 'src'),

  // output: desired location.
  output: Object.assign(
    {
      path: path.resolve(process.cwd(), 'build'),
    },
    config.output,
  ),

  // module: how you're gonna handle the files for webpack.
  module: {
    rules: [
      // transpile new (js|jsx) into old one.
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      // transpile new css file into old one.
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // transpile scss into css.
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      // transpile assets.
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset',
      },
    ],
  },

  // optimization: configuration optimize when bundling depends on mode.
  optimization: config.optimization,

  // plugins: optimization helpers.
  plugins: config.plugins,

  // devtool: help developers when developping or in production.
  devtool: config.devtool,

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

  // devServer: only for development.
  devServer: {
    static: {
      directory: path.resolve(process.cwd(), 'build'),
    },
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
})
