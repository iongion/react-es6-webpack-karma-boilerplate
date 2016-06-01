/* eslint-disable */
'use strict';

// node
const path = require('path');
// vendors
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const readline = require('readline');
// project
const config = require('../webpack.config');
config.devtool = 'source-map';
config.path = path.resolve(__dirname, '../dist');
config.debug = true;
const packageInfo = require('../package.json');
// locals
const isWin = /^win/.test(process.platform);
const compiler = webpack(config);
const serverConfig = {
  hot: true,
  progress: true,
  historyApiFallback: true,
  quiet: false,
  noInfo: false,
  stats: { colors: true },
  contentBase: config.path,
};
const server = new WebpackDevServer(compiler, serverConfig);
// hook into process to terminate server at exit - fixes CTRL + C on windows
if (isWin) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on('SIGINT', () => {
    process.emit('SIGINT');
  });
}
process.on('SIGINT', () => {
  try {
    server.close();
    process.exit(0);
  } catch (ex) {
    console.log('Could not stop child process:', ex);
  }
});

server.listen(
  packageInfo.config.devserver.port,
  packageInfo.config.devserver.host,
  (err) => {
    if (err) {
      console.log(err);
    }
    console.log(
      'Listening at',
      [packageInfo.config.devserver.host, ':', packageInfo.config.devserver.port].join('')
    );
  }
);
