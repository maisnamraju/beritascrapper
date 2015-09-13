var gulp = require('gulp');
var nodemon = require('gulp-nodemon');



gulp.task('serve', function () {
  nodemon({
	    script: 'index.js'
	  });
	})

gulp.task('default', ['serve']);
