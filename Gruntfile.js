module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        copy: {
            dependencies: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: [
                            'bower_components/angular/angular.min.js',
                            'bower_components/angular-ui-router/release/angular-ui-router.min.js',
                            'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                            'bower_components/jquery/dist/jquery.min.js'
                        ],
                        dest: 'firefox/data/js/ext/'
                    }
                ]
            }
        },
        shell: {
            xpi: {
                command: [
                    'cd firefox',
                    'cfx xpi',
                    'wget --post-file=red-button.xpi http://localhost:8888/ || echo>/dev/null'
                ].join('&&')
            }
        },
        watch: {
            xpi: {
                files: ['firefox/**'],
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
            'shell:xpi',
            'watch'
        ]);
};