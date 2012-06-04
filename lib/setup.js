//Setup.js created by Ben Weaver (http://gist.github.com/508314)

var fs = require('fs'),
    path = require('path');

exports.app = app;


/// --- Methods

var run = require;

// A shortcut for adding `lib' and `ext' subfolders, then running a
// main program.
function app(base, main) {
  lib(path.join(base, 'lib'));
  ext(path.join(base, 'ext'));
  return main ? run(path.join(base, main)) : exports;
}


/// --- Aux

function exists(filename) {
  try {
    fs.statSync(filename);
    return true;
  } catch (x) {
    return false;
  }
}