'use strict';

var gulp = require('gulp'),
  clean = require('gulp-clean'),
  less = require('gulp-less'),
  prefix = require('gulp-autoprefixer'),
  connect = require('connect'),
  gutil = require('gulp-util');

var jade = require('gulp-jade');

var reloadServer;

gulp.task('jade', function(){

  var YOUR_LOCALS = {};

  return gulp.src('index.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('.tmp/'));
});

gulp.task('less', function () {
  var l = less({});
  l.on('error',function(e){
    gutil.log(e);
    gutil.beep();
    l.end();
  });
  return gulp.src('main.less')
    .pipe(l)
    .pipe(prefix('last 4 versions', '> 1%', 'ie 8', 'ie 7'))
    .pipe(gulp.dest('.tmp/'));
});

gulp.task('clean', function() {
  gulp.src(['.tmp/'], {read: false})
    .pipe(clean());
});

function reload(watchEvent){
  if(reloadServer){
    reloadServer.changed({
      body: {
        files: [watchEvent.path]
      }
    });
  }
}

gulp.task('watch',function(){
  gulp.watch('*.jade',['jade']).on('change',reload);
  gulp.watch('*.less',['less']).on('change',reload);
});

gulp.task('connect', function(next) {
  var server = connect();
  server
    .use(require('connect-livereload')())
    .use(connect.static('.tmp/'))
    .listen(9000, next);
});

gulp.task('tiny-lr',function(){
  reloadServer = require('tiny-lr')();
  reloadServer.listen(35729);
});

gulp.task('build', ['clean','less','jade']);

gulp.task('serve', ['build','tiny-lr','connect', 'watch']);

//TODO

// livereload
// js hint
// jsmin
// ngmin
// browserify