/* eslint-disable */
'use strict';

// node
const fs = require('fs');
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
      fs.createReadStream(inputPath).pipe(fs.createWriteStream(outputPath));
    }
  })
};
// locals
function Processor(relativePath, absolutePath, done) {
  const outputPath = path.join(root,  relativePath.replace('assets', 'dist'));
  processFile(absolutePath, outputPath, done);
}
// skip css files
Processor.canProcess = (relativePath) => relativePath.startsWith('assets') && (relativePath.indexOf('.css') === -1);

module.exports = Processor;
