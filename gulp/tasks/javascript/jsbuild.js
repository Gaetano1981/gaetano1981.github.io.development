var gulp = require('gulp');
var concat = require('gulp-concat');
var angularOrder = require('gulp-angular-order');
 
gulp.task('jsbuild', function () {
    return gulp.src('js/**/*.js')
        .pipe(angularOrder())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('js/dist'));
});
