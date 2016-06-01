/* eslint-disable */
'use strict';

// node
// vendors
const webpack = require('karma-webpack');
// project
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpackConfig = require('./webpack.config');
// locals
webpackConfig.externals = {};
webpackConfig.devtool = 'inline-source-map';
webpackConfig.module.loaders = [
  {
    test: /\.(js|jsx)$/, exclude: /(bower_components|node_modules)/,
    loader: 'babel-loader',
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
    test: /\.png$/,
    loader: 'url-loader?limit=10000&mimetype=image/png',
  },
  {
    test: /\.html$/,
    loaders: ['html-loader'],
  },
];
webpackConfig.module.postLoaders = [{
  test: /\.(js|jsx)$/, exclude: /(node_modules|bower_components|tests)/,
  loader: 'istanbul-instrumenter',
}];

module.exports = function exports(config) {
  config.set({
    frameworks: ['mocha', 'sinon-chai'],
    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      'test/modules/**/*.spec.js',
    ],
    plugins: [
      webpack,
      'karma-mocha',
      'karma-sinon-chai',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher',
      'karma-coverage',
      'karma-spec-reporter',
    ],
    browsers: ['PhantomJS'],
    preprocessors: {
      'test/modules/**/*.spec.js': ['webpack'],
      'src/**/*.js': ['webpack'],
    },
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: 'build/reports/coverage',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' },
        { type: 'cobertura', subdir: '.', file: 'cobertura.txt' }
      ],
    },
    client: {
      chai: {
        includeStack: true,
      },
    },
    webpack: webpackConfig,
    webpackMiddleware: { noInfo: true },
  });
};
