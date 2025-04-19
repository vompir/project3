const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

function buildStyles() {
    return gulp.src('sass/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
};

function serve() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
};

function watchFiles() {
    gulp.watch('sass/**/*.sass', buildStyles);
    gulp.watch('*.html').on('change', browserSync.reload);
}

exports.default = gulp.series(buildStyles, gulp.parallel(serve, watchFiles));