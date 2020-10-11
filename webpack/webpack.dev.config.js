const webpackBaseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: ['./example/index.tsx'],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './example/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    inline: true,
    host: 'localhost',
    port: 4444,
    hot: true
  }
})
