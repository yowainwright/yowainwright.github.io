var gulp = require('gulp');

gulp.task('copy', function() {
	gulp.src('node_modules/sassimple/mixins/**/*.scss')
 		.pipe(gulp.dest('_sass/sassimple/'));
}); 

gulp.task('default', ['copy']);