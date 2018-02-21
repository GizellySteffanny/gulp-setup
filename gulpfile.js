var
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin'),
    gls = require('gulp-live-server');


// run all tasks
gulp.task('default', ['html', 'sass', 'js', 'image', 'watch', 'server']);

// compile, concat and compress css files
gulp.task('sass', function () {
    return gulp.src('assets/src/sass/**/*.scss')
        .pipe(concat ('style.min.css'))
        .pipe(sass ({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe( gulp.dest('assets/css'));
});

// concat and compress js files
gulp.task('js', function () {
    return gulp.src('assets/src/js/**/*.js')
    .pipe(concat ('app.min.js'))
    .pipe(uglify())
    .pipe( gulp.dest('assets/js'));
});

// minify images (all format)
gulp.task('image', function () {
    return gulp.src('assets/src/images/*')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 6}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe( gulp.dest('assets/images'));
});

// minify html
gulp.task('html', function() {
    return gulp.src('_html/**/*.html')
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('.'));
});

// Setting up the Watch
gulp.task('watch', function() {
    gulp.watch('_html/**/*.html', ['html']);
    gulp.watch('assets/src/sass/**/*.scss', ['sass']);
    gulp.watch('assets/src/js/**/*.js', ['js']);
    gulp.watch('assets/src/images/*', ['image']);
});

// Server & setup livereload
gulp.task('server', function () {
    var server = gls.static('./', 8000);
    server.start();

    gulp.watch('assets/css/**/*.css', function (file) {
        gls.notify.apply(server, [file]);
    });
    gulp.watch('assets/js/**/*.js', function (file) {
        gls.notify.apply(server, [file]);
    });
    gulp.watch('assets/image/**/*', function (file) {
        gls.notify.apply(server, [file]);
    });
    gulp.watch('./*.html', function (file) {
        gls.notify.apply(server, [file]);
    });
});