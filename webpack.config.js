/* eslint-disable */
'use strict';

// node
const path = require('path');
// vendors
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
// project
// locals

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:5000',
    'webpack/hot/dev-server',
    './src/modules/EntryPoint',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '',
    sourceMapFilename: 'maps/bundle.js.map',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: path.resolve(path.join(__dirname, 'src/modules')),
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('css/styles.css', { allChunks: true }),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
        ),
      },
      {
        test: /\.svg$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
      {
        test: /\.html$/,
        loaders: ['html-loader'],
      },
    ],
  },
};
