var gulp = require('gulp');
var path = require('path');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var bower = require('bower');
var gutil = require('gulp-util');
var concat = require('gulp-concat');

var basePaths = {
    src: 'app/',
    dest: 'public/assets/',
    bower: 'bower_components/'
};

var paths = {
    scripts: {
        src: basePaths.src + 'js/',
        dest: basePaths.dest + 'js/min/'
    },
    styles: {
        src: basePaths.src + 'less/',
        dest: basePaths.dest + 'css/min/'
    }
};

gulp.task('install', function() {
    return bower.commands.install()
        .on('log', function(data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('buildCSS', function () {
    return gulp.src([paths.styles.src+'**/*.less','bower_components/bootstrap/less/bootstrap.less'])
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(minifyCss())
        .pipe(concat('all.min.css'))
        .pipe(gulp.dest(paths.styles.dest))
});

gulp.task('buildJS', ['hint', 'jscs'], function() {
    return gulp.src(paths.scripts.src+'*.js')
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('hint', function() {
    return gulp.src(paths.scripts.src+'*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
});

gulp.task('jscs', function() {
    return gulp.src(paths.scripts.src+'*.js')
        .pipe(jscs({
            configPath: '.jscsrc'
        }));
});

gulp.task('default', ['install','buildCSS', 'buildJS']);

