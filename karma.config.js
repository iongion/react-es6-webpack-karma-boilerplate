/* eslint-disable */
'use strict';

// node
// vendors
const webpack = require('karma-webpack');
// project
const webpackConfig = require('./webpack.config');
// locals
webpackConfig.externals = {};
webpackConfig.devtool = 'inline-source-map';
webpackConfig.module.loaders = [
  {
    test: /\.(js|jsx)$/, exclude: /(bower_components|node_modules)/,
    loader: 'babel-loader',
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
      'tests/**/*_spec.js',
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
      'tests/**/*_spec.js': ['webpack'],
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
