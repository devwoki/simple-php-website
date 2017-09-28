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
                            'public/css/content.css',
                            'public/css/circle.css'
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
                // uses_defaults: ['Gruntfile.js', 'public/js/*.js', 'test/**/*.js', 'public/template/*.php']   // TODO: do jshint on the JavaScrip code in a PHP file
                // all: ['Gruntfile.js', 'public/js/*.js', 'test/**/*.js']
            },

            less: {
                development: {
                    // options: {
                    //     paths: ['assets/css']
                    // },
                    files: {
                        'public/css/content.css': 'public/css/content.less',
                        'public/css/circle.css': 'public/css/circle.less'
                    }
                }
            },

            lesslint: {
                src: ['public/css/*.less'],
                options: {
                    csslint: {
                        'known-properties': false,
                        csslintrc: '.csslintrc'
                    }
                }
            },

            // htmllint: {
            //     all: ['public/content/*.html'],
                // options: {
                //     ignore: 'Start tag seen without seeing a doctype first. Expected "<!DOCTYPE html>"'
                // }
            // }

            htmllint: {
                // options: {},
                // options: {
                //     force: true,
                //     opts: { maxerr: 5 }
                // },
                src: [
                    'public/content/products.php'
                ]
            }

            // TODO: grunt-contrib-concat - kinda can do with cssmin!!
            // TODO: grunt html lint
        });

        // Load the plugin
        grunt.loadNpmTasks('grunt-npm-install');
        grunt.loadNpmTasks('grunt-contrib-cssmin');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-contrib-less');
        grunt.loadNpmTasks('grunt-lesslint');
        // grunt.loadNpmTasks('grunt-html');
        grunt.loadNpmTasks('grunt-htmllint');

        // grunt.registerTask('default', ['npm-install']);
        grunt.registerTask('pre-commit', ['lesslint', 'jshint']);

        // Do the task
        // grunt.registerTask('default', ['cssmin', 'uglify']);
        // grunt.registerTask('default', ['jshint']);
        grunt.registerTask('default', ['npm-install', 'default-development']);
        grunt.registerTask('default-development', ['pre-commit', 'less']);
        grunt.registerTask('default-prod', ['pre-commit', 'less', 'cssmin']);
    };
})(module);