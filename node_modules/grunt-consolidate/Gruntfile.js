/*
 * grunt-consolidate
 * https://github.com/mikevercoelen/grunt-consolidate
 *
 * Copyright (c) 2013 Mike Vercoelen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    clean: {
      tests: ['tmp'],
    },

    consolidate: {
      options: {
        engine: 'dust'
      },
      dev: {
        options: {
          local: {
            users: [{
              name: 'tom',
              email: 'tom@mail.com',
              password: 'computer1'
            }, {
              name: 'rick',
              email: 'rick@mail.com',
              password: 'secret1'
            }]
          }
        },
        files: [{
          expand: true,
          cwd: 'test/fixtures',
          src: ['{,*/}*.dust'],
          dest: 'tmp/',
          ext: '.html',
          filter: function(srcFile) {
            return !/\/_/.test(srcFile);
          }
        }]
      }
    }

  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('test', ['clean', 'consolidate:dev']);
  grunt.registerTask('default', ['jshint', 'test']);
};
