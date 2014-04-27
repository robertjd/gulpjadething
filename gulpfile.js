'use strict';

var gulp = require('gulp'),
  clean = require('gulp-clean');

var jade = require('gulp-jade');

gulp.task('jade', function(){

  var YOUR_LOCALS = {};

  gulp.src('index.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('.tmp/'));
});

gulp.task('clean', function() {
  return gulp.src(['.tmp/'], {read: false})
    .pipe(clean());
});

gulp.task('watch',function(){
  gulp.watch('*.jade',['jade']);
});

//TODO
// stylus
// livereload
// js hint
// jsmin
// ngmin
// browserify