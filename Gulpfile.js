var gulp = require('gulp'),
    bower = require('gulp-bower'),
    connect = require('gulp-connect');

gulp.task('bower:install', function () {
  return bower();
});

gulp.task('bower', ['bower:install'], function(){

});

gulp.task('connect', function () {
  connect.server({
    livereload: true
  });
});

gulp.task('default', ['bower', 'connect']);
