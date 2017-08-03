var gulp = require('gulp');
var requireDir = require('require-dir');

gulp.task('default', ['all-css', 'jsbuild', 'watch', 'server']);

requireDir('./gulp/tasks', { recurse: true });
