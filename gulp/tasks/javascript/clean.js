var gulp = require('gulp');
var clean = require('gulp-clean');

gulp.task('jsclean', function () {
	// must return something so Gulp can understand this 
	// is a syncronous operation
	return gulp.src('js/dist').pipe(clean());
});
