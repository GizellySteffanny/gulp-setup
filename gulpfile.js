var
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin');
    //pngquant = require('imagemin-quant');


// run all tasks
gulp.task('default', ['sass', 'js', 'image']);

// compile, concat and  compress css files
gulp.task('sass', function () {
    return gulp.src('assets/src/sass/**/*.scss')
        .pipe(concat ('style.min.css'))
        .pipe(sass ({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe( gulp.dest('assets/css'));
});

// concat and compress
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
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe( gulp.dest('assets/images'));
});