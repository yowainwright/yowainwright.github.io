var gulp = require('gulp');

gulp.task('copy', function() {
  gulp.src('bower_components/scss-utility-mixins/src/mixins/**/*.scss')
    .pipe(gulp.dest('_sass/components'));
});