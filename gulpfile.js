var gulp = require('gulp');
var path = require('path');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');

gulp.task('less', function () {
    return gulp.src('./less/**/*.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.src('./css/**/*.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('./public/css'));
});