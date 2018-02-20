var
    gulp = require('gulp'),
    sass = require('gulp-sass');

// my tasks
gulp.task('default', ['sass']);

// compiled and compressed css files
gulp.task('sass', function () {
    return gulp.src('assets/src/sass/**/*.scss')
        .pipe( sass ({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe( gulp.dest('assets/css'));
});