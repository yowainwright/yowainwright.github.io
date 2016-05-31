var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var purifyCSS = require('gulp-purifycss');
var cssnano = require('gulp-cssnano');

gulp.task('copy', function() {
  gulp.src('./bower_components/normalize-css/normalize.css')
  	.pipe(rename({prefix: '_', suffix: '_compiled', extname: '.scss'}))
    .pipe(gulp.dest('./assets/style/pre/'));
});

// compile styles 
gulp.task('styles', function() {

  gulp
    .src('assets/styles/pre/main.scss')
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(purifyCSS(['/**/*.html', '']))
    .pipe(cssnano())
    .pipe(gulp.dest('assets/css/'));

});

// watch yaml config folder changes
gulp.task('default',function() {
  // gulp.watch('./src/config/*.yml', ['aware', 'educate', 'populate', 'inform', 'quiz']);
});