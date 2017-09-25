/* global module */
(function (module) {
    "use strict";

    module.exports = function (grunt) {

        // Simple grunt task example
        /*grunt.registerTask('default', '', function () {
            grunt.log.write('This grunt task is pointless');
        });*/

        // Configure main project settings
        grunt.initConfig({

            // Basic settings and info about our plugins
            pkg: grunt.file.readJSON('package.json'),

            // Name of plugin (plugin name without the "grunt-contrib-")
            cssmin: {
                combine: {
                    files: {
                        'public/css/main.min.css': [
                            'public/css/content.css'
                        ]
                    }
                }
            },

            // uglify
            uglify: {
                dist: {
                    files: {
                        'public/js/main.min.js': [
                            'public/js/content.js'
                        ]
                    }
                }
            },

            watch: {
                js: {
                    files: ['public/js/*.js'],
                    // tasks: ['uglify', 'jshint']
                    tasks: ['jshint']
                },
                css: {
                    files: ['public/css/*.css'],
                    tasks: ['cssmin']
                }
            },

            jshint: {
                options: {
                    curly: true,
                    eqeqeq: true,
                    eqnull: true,
                    browser: true,
                    globals: {
                        jQuery: true
                    }
                },
                uses_defaults: ['Gruntfile.js', 'public/js/*.js', 'test/**/*.js']
                // all: ['Gruntfile.js', 'public/js/*.js', 'test/**/*.js']
            }

            // TODO: grunt-contrib-concat
        });

        // Load the plugin
        grunt.loadNpmTasks('grunt-contrib-cssmin');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-jshint');

        // Do the task
        // grunt.registerTask('default', ['cssmin', 'uglify']);
        grunt.registerTask('default', ['jshint']);
    };
})(module);