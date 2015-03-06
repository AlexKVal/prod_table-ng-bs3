var gulp = require('gulp'),
    bower = require('gulp-bower'),
    connect = require('gulp-connect'),
    shell = require('gulp-shell');

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

gulp.task('open_in_browser', shell.task([
  'open http://localhost:8080'
]));

gulp.task('default', ['bower', 'connect', 'open_in_browser']);
