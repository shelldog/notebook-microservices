/* Copyright(c) 2022-2023 Hajime - Kha Tran.
 *
 * Configuration file for Babel.
 *
 * description: this configuration applies for the entire
 * tools using with Babel.
 * */

module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { targets: { node: 'current' } }],
  ],
}
