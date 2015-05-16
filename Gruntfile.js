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

    grunt.registerTask(
        'manifest', 'Extend manifest.json with extra fields from package.json',
        function () {
            var pkg = grunt.file.readJSON('package.json');
            var chrome = grunt.file.readJSON('chrome/manifest.json');
            var firefox = grunt.file.readJSON('firefox/package.json');
            var fields = ['version'];
            for (var i = 0; i < fields.length; i++) {
                var field = fields[i];
                chrome[field] = firefox[field] = pkg[field];
            }
            grunt.file.write('build/chrome/manifest.json', JSON.stringify(chrome, null, 2));
            grunt.file.write('build/firefox/package.json', JSON.stringify(firefox, null, 2));
            grunt.log.ok('manifest files generated');
        }
    );
    grunt.registerTask('default',
        [
            'copy:dependencies',
            'shell:xpi',
            'watch'
        ]);
};