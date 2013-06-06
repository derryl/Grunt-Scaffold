'use strict';

var path = require('path');

// LiveReload helpers
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var folderMount = function folderMount(connect, point) { return connect.static(path.resolve(point)); };

// Other config
var localhostPort = 9001;

module.exports = function(grunt) {

    grunt.initConfig({

        clean: {
            all:  ['public','temp','dist'],
            temp: ['temp'],
            dist: ['dist']
        },

        copy: {
            // Copy files into /temp for processing
            temp: {
                files: [{ 
                  expand: true,
                  cwd: 'app',
                  src: ['views/**','images/**'], 
                  dest: 'temp' 
                }]
            },
            // Copy built files into /public for viewing
            "public": {
                files: [
                  { expand: true, cwd: 'temp', src: ['**'], dest: 'public' }
                ]
            }
        },

        regarde: {
            // Trigger new build when source files change
            express: {
                files: ['app/*','app/**'],
                tasks: ['build']
            },
            // Trigger LR when build is complete
            pub: {
                files: 'public/**/*',
                tasks: 'livereload'
            },
            trigger: {
                files: ['.reload/*'],
                tasks: 'express-restart:livereload'
            }
        },

        express: {
            livereload: {
                options: {
                    server: path.resolve('./app/server'),
                    bases: path.resolve('public'),
                    port: localhostPort,
                    monitor: {},
                    debug: true
                }
            }
        },

        less: {
            dev: {
                files: {
                    'temp/styles/master.css': 'app/styles/source/master.less'
                }
            }
        },

        coffee: {
          dev: {
            files: {
              'temp/javascript/app.js': ['app/javascript/source/app.coffee']
            }
          }
        },

        replace: {
            reload: {
              src:  ['.reload/static'],
              dest: ['.reload/changed'],
              overwrite: false,
              replacements: [{
                from: /@@timestamp/,
                to: '<%= new Date().getTime() %>'
              }]
            }
        },

        shell: {
            launchBrowser: {
                command: 'open http://0.0.0.0:' + localhostPort
            }
        }


    });

    // Load required Grunt modules
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-regarde');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-shell');


    // Define our tasks
    grunt.registerTask('build', [
        'clean:all',
        'copy:temp',
        'less:dev',
        'coffee:dev',
        'copy:public',
        'clean:temp'
    ]);

    grunt.registerTask('server', [
        'livereload-start', 
        'express',
        'regarde'
    ]);

    grunt.registerTask( 'run', ['build','shell:launchBrowser','server']);
    grunt.registerTask( 'default', ['build','server']);

};