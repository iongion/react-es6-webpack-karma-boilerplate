/* eslint-disable */
'use strict';

// node
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
// vendors
const mkdirp = require('mkdirp');
// project
const root = path.join(__dirname, '../../');
const pkginfo = require(path.join(root, 'package.json'));
const processFile = (inputPath, outputPath, cb) => {
  mkdirp(path.dirname(outputPath), (err) => {
    if (err) {
      cb(err);
    } else {
      // copy the file as is
      console.log('copy', path.relative(root, inputPath), '>', path.relative(root, outputPath));
      fse.copy(inputPath, outputPath, cb);
    }
  })
};
// locals
function Processor(relativePath, absolutePath, done) {
  const outputPath = path.join(root, relativePath.replace('assets', 'dist'));
  processFile(absolutePath, outputPath, done);
}
// skip css files
Processor.canProcess = (relativePath) => relativePath.startsWith('assets');

module.exports = Processor;
