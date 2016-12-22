module.exports = {
    options: {
        livereload: false
    },
    js: {
        files: ["src/**/*"],
        tasks: "browserify".split(',')
    },
    assets: {
        files: [
            //"assets/images/**/*",
            "assets/sounds/**/*"
        ],
        tasks: "compress".split(',')
    }
};