/* eslint-disable */
'use strict';

// node
const path = require('path');
// vendors
const walk = require('walk');
const requireDir = require('require-dir');
// project
// locals
const root = path.dirname(__dirname);
const src = path.join(root, 'src');
const processors = requireDir('./processors');
const startProcessing = (relativePath, absolutePath, cb) => {
  for (var p in processors) {
    if (!processors.hasOwnProperty(p)) continue;
    const Processor = processors[p];
    if (Processor.canProcess(relativePath, absolutePath)) {
      Processor(relativePath, absolutePath);
    } 
  }
  cb();
};
// traverse the source tree just once
const options = {
  filters: ['modules'],
};
const walker = walk.walk(src, options);
walker.on('file', (base, fileStats, next) => {
  const absolutePath = path.join(base, fileStats.name);
  const relativePath = path.relative(path.join(root, 'src'), absolutePath);
  startProcessing(relativePath, absolutePath, next);
});
walker.on('errors', (err) => {
  console.error('Processing errors', err);
  process.exit(1);
});
walker.on('end', () => {
  process.exit(0);
});
