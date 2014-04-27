'use strict';

var gulp = require('gulp');

var jade = require('gulp-jade');

gulp.task('jade', function(){

  var YOUR_LOCALS = {};

  gulp.src('*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./.tmp/'))
});

//TODO
// livereload
// js hint
// jsmin
// ngmin
// browserify