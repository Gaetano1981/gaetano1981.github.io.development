var gulp = require('gulp');
var bs = require('browser-sync').create();

gulp.task('server', function() {
  bs.init(null, {
    open: true,
	injectChanges: true,
    server: {
      baseDir: './'
    },
    reloadDelay: 2000,
    watchOptions: {
      debounceDelay: 1000
    }
  })
});