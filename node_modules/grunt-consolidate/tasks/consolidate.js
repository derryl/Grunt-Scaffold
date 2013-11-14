/*
 * grunt-consolidate
 * https://github.com/mikevercoelen/grunt-consolidate
 *
 * Copyright (c) 2013 Mike Vercoelen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var cons = require('consolidate');
  var _ = grunt.util._;
  var async = grunt.util.async;

  grunt.registerMultiTask('consolidate', 'Use consolidate.js to apply templating to your Grunt projects', function() {
    var options = this.options({
      engine: '',
      cache: false,
      local: {}
    });

    var engine = options.engine;
    var cache = options.cache;
    var local = options.local;
    var ext = options.ext;

    var defConsOptions = {
      cache: cache
    };

    if (ext) {
      defConsOptions.ext = ext;
    }

    _.defaults(defConsOptions, local);

    var done = this.async();
    var files = this.files;

    var engineFn = cons[engine];

    async.forEachLimit(files, 30, function(file, next) {
      var src = file.src[0];
      var dest = file.dest;

      var consOptions = {
        views: file.orig.cwd
      };

      _.extend(consOptions, defConsOptions);

      engineFn(src, consOptions, function(error, output) {
        if (error) {
          return next(error);
        }

        grunt.file.write(dest, output);
        grunt.log.ok('File "' + dest + '" created.');
        next();
      });
    }, done);
  });
};