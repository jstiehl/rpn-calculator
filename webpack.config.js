const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const babel = require('./loaders/babel')
const styles = require('./loaders/styles')
const images = require('./loaders/images')

const env = {
  NODE_ENV: JSON.stringify(process.env.NODE_ENV)
}

module.exports = {
  name: 'client',
  target: 'web',
  mode: 'production',
  entry: {
    app: ['babel-polyfill', './Calculator/index.js']
  },
  output: {
    path: __dirname + '/build',
    filename: 'index.js',
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env,
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
      chunkFilename: '[id].css',
    }),
  ],
  module: {
    rules: [
      babel,
      styles(env.NODE_ENV),
      images,
    ],
  },
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'all',
    },
  },
}