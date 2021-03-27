module.exports = function(grunt){
    "use strict";

    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        babel: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    "scripts/dist/main.js": "scripts/es6/main.js"
                }
            }
        },
        watch: {
            dev: {
                files: 'scripts/es6/main.js',
                tasks: ["babel"],
            },
        },
    });

    grunt.registerTask('watcher', 'watch:dev');
    grunt.registerTask("default", ["babel"]);
}