
var path = require('path')
  , through = require('through2')
  , gutil = require('gulp-util')
  , hatter = require('./hatter.js');

var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-purescript-hatter';

module.exports = {
  compile: function (opts) {
    opts = opts || {};
    return through.obj(function(file, enc, cb) {

      if (file.isNull()) {
        return cb(null, file);
      }

      if (file.isStream()) {
        return cb(new PluginError(PLUGIN_NAME, 'Streaming not supported', {
          fileName: file.path,
          showStack: false
        }));
      }

      try {
        file.path = gutil.replaceExtension(file.path, ".purs");
        file.contents = new Buffer(
          hatter(opts.imports || [])(String(file.contents)).value0
        );
      } catch (e) {
        return cb(new PluginError(PLUGIN_NAME, e.message || e.msg, {
          fileName: file.path,
          lineNumber: e.line,
          stack: e.stack,
          showStack: false
        }));
      }
      return cb(null, file);
    });
  }
};
