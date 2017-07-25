var config = require('../../gulpconfig.json');
var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('concat-css', function () {
  return gulp.src(config.concatCss.source)
    .pipe(concatCss(config.concatCss.concatTo))
	.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(gulp.dest(config.concatCss.destination));
});
