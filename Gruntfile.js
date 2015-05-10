module.exports = function (grunt) {
    'use strict';
    //require('matchdep').filterDev('grunt-!(cli)').forEach(grunt.loadNpmTasks);
    grunt.initConfig({
        copy: {
            dependencies: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: [
                            'bower_components/angular/angular.min.js',
                            'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                            'bower_components/jquery/dist/jquery.min.js'
                        ],
                        dest: 'addon/data/js/ext/'
                    }
                ]
            }
        },
        shell: {
            xpi: {
                command: [
                    'cd addon',
                    'cfx xpi',
                    'wget --post-file=pluginname.xpi http://localhost:8888/ || echo>/dev/null'
                ].join('&&')
            }
        },
        watch: {
            xpi: {
                files: ['addon/**'],
                tasks: ['shell:xpi']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default',
        [
            'copy:dependencies',
            'watch'
        ]);
};