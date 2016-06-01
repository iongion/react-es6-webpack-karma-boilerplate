/* eslint-disable */
'use strict';

// node
const fs = require('fs');
const path = require('path');
// vendors
const ejs = require('ejs');
const mkdirp = require('mkdirp');
// project
const root = path.join(__dirname, '../../');
const pkginfo = require(path.join(root, 'package.json'));
const processFile = (inputPath, outputPath, cb) => {
  // generate file from template with context
  const input = fs.readFileSync(path.resolve(inputPath)).toString();
  const context = {
    package: pkginfo,
    env: process.env,
  };
  const output = ejs.render(input, context);
  mkdirp(path.dirname(outputPath), (err) => {
    if (err) {
      cb(err);
    } else {
      // write the generated file
      console.log('generate', path.relative(root, inputPath), '>', path.relative(root, outputPath));
      fs.writeFileSync(path.resolve(outputPath), output);
      cb();
    }
  })
};
// locals
function Processor(relativePath, absolutePath, done) {
  const outputPath = path.join(root, 'dist', relativePath);
  processFile(absolutePath, outputPath, done);
}
// only html files
Processor.canProcess = (relativePath) => relativePath.indexOf('.html') !== -1;

module.exports = Processor;
