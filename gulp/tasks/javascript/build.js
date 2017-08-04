var gulp = require('gulp');
var concat = require('gulp-concat');
var angularOrder = require('gulp-angular-order');
var clean = require('gulp-clean');
var babel = require('gulp-babel');

// before executing jsbuild I want to clear all files in dist folder
// this is why hereby jsbuild is declared as dependent by jsclean task

gulp.task('jsbuild', ['jsclean'], function () {
    return gulp.src('js/**/*.js')
        .pipe(angularOrder())
        .pipe(concat('bundle.js'))
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(gulp.dest('js/dist'));
});
