'use strict';

var gulp = require('gulp'),
  clean = require('gulp-clean'),
  less = require('gulp-less');

var jade = require('gulp-jade');

gulp.task('jade', function(){

  var YOUR_LOCALS = {};

  gulp.src('index.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('.tmp/'));
});

gulp.task('less', function () {
  gulp.src('main.less')
    .pipe(less({}))
    .pipe(gulp.dest('.tmp/'));
});

gulp.task('clean', function() {
  return gulp.src(['.tmp/'], {read: false})
    .pipe(clean());
});

gulp.task('watch',['clean'],function(){
  gulp.watch('*.jade',['jade']);
  gulp.watch('*.less',['less']);
});

//TODO

// livereload
// js hint
// jsmin
// ngmin
// browserify