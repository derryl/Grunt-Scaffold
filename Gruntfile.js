'use strict';

var path = require('path');

module.exports = function(grunt) {

    var g = grunt;

    var config = {
        dirs: {
            'src':  'app',      // source files
            temp:   'temp',     // temporary dir
            local:  'local',    // for local builds
            dist:   'dist'      // for production-ready builds
        },
        server: {
            port: 8797
        }
    };

    var _src    = config.dirs.src;
    var _temp   = config.dirs.temp;
    var _local  = config.dirs.local;
    var _dist   = config.dirs.dist;
    var _port   = config.server.port;

    grunt.initConfig({

        _src  : _src,  
        _temp : _temp, 
        _local: _local,
        _dist : _dist, 
        _port : _port, 

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
                  cwd:  _src,
                  src:  ['views/**','images/**','favicon.ico'], 
                  dest: _temp
                }]
            },
            // Copy built files into /local for viewing
            "public": {
                files: [
                    { expand: true, cwd: _temp + '/views', src: ['*'], dest: _local },
                    { expand: true, cwd: _temp + '/javascript', src: ['*'], dest: _local + '/javascript' },
                    { expand: true, cwd: _temp + '/styles', src: ['*'], dest: _local + '/styles' }
                ]
            },
            views: {
                files: [{ expand: true, cwd: _temp + '/views', src: ['*'], dest: _local }]
            }
        },


        // Serve /local on specified default port
        connect: {
            server: {
                options: {
                    port: _port,
                    base: 'local',
                    hostname: '*'
                }
            }
        },

        // Whenever a source file changes,
        // kick off a dev build and trigger LiveReload
        watch: {
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: [ 'shell:stopserver', 'server' ]
            },
            html: {
                files: [_src + '/**/*.html'],
                tasks: [ 'copy:views' ],
                options: { livereload: true }
            },
            coffee: {
                files: [ _src + '/**/*.coffee' ],
                tasks: [ 'coffee:dev' ]
            },
            less: {
                files: [ _src + '/styles/**/*.less'],
                tasks: ['less:dev'],
                options: { livereload: true }
            },
            media: {
                files: [_src + '/images/**/*', _src + '/**/*.js'],
                options: { livereload: true }
            }
        },

        // Styles compile to: /styles/master.css
        less: {
            dev: {
                files: [{ 'temp/styles/master.css': 'app/styles/source/master.less' }]
            }
        },

        // Javascript compiles to: /javascript/*
        coffee: {
            dev: {
                expand: true,
                cwd:  _src + '/javascript/source',
                src:  '*.coffee',
                dest: _src + '/javascript',
                ext:  '.js'
            }
        },

        // replace: {
        //     reload: {
        //       src:  ['.reload/static'],
        //       dest: ['.reload/changed'],
        //       overwrite: false,
        //       replacements: [{
        //         from: /@@timestamp/,
        //         to: '<%= new Date().getTime() %>'
        //       }]
        //     }
        // },

        shell: {
            launchBrowser: {
                command: 'open http://0.0.0.0:' + _port
            },
            stopserver: {
                command: './connect-restart.sh ' + _port
            },
            test: {
                command: 'echo "triggered the watch task"'
            }
        }


    });

    // Load required Grunt modules
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    //grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-newer');


    // Define our tasks
    grunt.registerTask('build', [
        'clean:all',
        'copy:temp',
        'less:dev',
        'coffee:dev',
        'copy:public',
        'clean:temp'
    ]);

    // var echoObject = function(object, indent = 0) {
    //     var spacing = '';
    //     while (indent > 0) {
    //         spacing += '/t';
    //         indent--;
    //     }
    //     for (var key in object) {
    //         var val = object[key];
    //         grunt.log.writeln( spacing + key + ': ' + val);
    //     }
    // }

    // grunt.registerMultiTask( 'coffee', 'Log coffee paths', function() {
    //     for (var key in this.data) {
    //         var val = this.data[key];
    //         grunt.log.writeln(key + ': ' + val);
    //         if (key === 'files') {
    //             grunt.log.writeln()
    //             // echoObject(key)
    //         }
    //     }
    // });

    grunt.registerTask( 'server',  [ 'connect', 'watch' ]);

    // grunt.registerTask('server', [
    //     'livereload-start', 
    //     'express',
    //     'regarde'
    // ]);

    grunt.registerTask( 'run', ['build','shell:launchBrowser','server']);
    grunt.registerTask( 'default', [
        'build',
        'server'
    ]);

};