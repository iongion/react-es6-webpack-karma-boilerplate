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
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new ExtractTextPlugin('css/styles.css', { allChunks: true }),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
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
