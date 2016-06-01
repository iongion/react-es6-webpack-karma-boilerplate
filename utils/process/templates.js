/* ES5 file %*/
// node
const fs = require('fs');
const path = require('path');
// vendors
const ejs = require('ejs');
const argv = require('yargs').argv;
// project
const pkginfo = require('../../package.json');
// locals

if (argv.input && argv.output) {
  const input = fs.readFileSync(path.resolve(argv.input)).toString();
  const context = {
    package: pkginfo,
    env: process.env,
  };
  const output = ejs.render(input, context);
  fs.writeFileSync(path.resolve(argv.output), output);
}
