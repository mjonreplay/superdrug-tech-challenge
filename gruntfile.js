module.exports = function(grunt) {
    grunt.initConfig({
        babel: {
        options: {
            sourceMap: true,
            presets: ["@babel/preset-env"],
        },
        dist: {
            files: {
                "scripts/dist/main.js": "scripts/es6/main.js"
            },
        },
        },
        watch: {
            dev: {
                files: 'scripts/es6/main.js',
                tasks: ["babel"],
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-babel');

    grunt.registerTask('watcher', 'watch:dev');
    grunt.registerTask("default", ["babel"]);
};