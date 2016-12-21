module.exports = {
    options: {
        livereload: false
    },
    js: {
        files: ["src/**/*.js"],
        tasks: "browserify,uglify".split(',')
    }
};