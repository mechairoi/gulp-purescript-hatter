'use strict';

var gutil = require('gulp-util')
  , assert = require('assert')
  , fs = require('fs')
  , path = require('path')
  , hatter = require('./')
;

it('should compile', function(cb){
  var stream = hatter.compile({})
    , fixture = path.join('Fixture', 'F1.hat');
  ;

  stream.on('data', function(file){
    var contents = file.contents.toString();
    assert(/VirtualDOM\.VTree\.Typed\.vtext/.test(contents));
    assert(/module Fixture.F1/.test(contents));
    assert.equal(path.join(__dirname, 'Fixture', 'F1.purs'), file.path);
    cb();
  });

  fs.readFile(fixture, function(e, buffer){
    if (e) {
      cb(assert(false));
    }
    else {
      stream.write(new gutil.File({
        cwd: __dirname,
        base: __dirname,
        path: path.join(__dirname, fixture),
        contents: buffer,
        stat: {mtime: new Date()}
      }));
      stream.end();
    }
  });
});

it('should fail to compile with an error message', function(cb){
  // TODO: implement
  cb();
});
