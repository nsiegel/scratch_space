var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var notify = require('gulp-notify');
var run_sequence = require('run-sequence').use(gulp);

var settings = {
  "sass_path": "./src/static/sass/",
  "js_path": "./src/static",
  "build_path": "./src/static/build/"
};

gulp.task('clean', function(cb) {
  return del([settings.build_path], cb);
});

gulp.task('build:style', function() {
  return gulp.src([settings.sass_path + 'scratch.scss'])
    .pipe(sass())
    .pipe(gulp.dest(settings.build_path))
    .pipe(notify('css compiled'));
});

gulp.task('build:js', function() {});

gulp.task('build', ['build:style', 'build:js'], function() {});

gulp.task('watch', ['build'], function() {
  gulp.watch([settings.sass_path + '**/*.scss'], ['build:style']);
  // gulp.watch([settings.js_path + '**/*.js'], ['build:js']);
});
