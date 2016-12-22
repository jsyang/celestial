// Single resource archive does away with spritesheets / sound sprites
// https://github.com/gruntjs/grunt-contrib-compress

module.exports = {
    assets: {
        options: { archive: 'assets.zip' },
        files: [
            //{ expand: true, cwd: 'assets/images/', src: ['**/*'], dest: 'images/'},
            { expand: true, cwd: 'assets/sounds/', src: ['**/*'], dest: 'sounds/'}
        ]
    }
};