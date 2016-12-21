module.exports = {
    options: {
        livereload: false
    },
    js: {
        files: ["src/**/*"],
        tasks: "browserify,uglify".split(',')
    }
};