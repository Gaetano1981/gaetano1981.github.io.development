var gulp = require('gulp');
var jshint = require('gulp-jshint');
var globalvariables = require('./hint-global-variables.json');

gulp.task('jshint', function () {
	return gulp.src(['js/angular/*.js'])
		.pipe(jshint({
			'predef': globalvariables
		}))
		.pipe(jshint.reporter('jshint-stylish'));
});
