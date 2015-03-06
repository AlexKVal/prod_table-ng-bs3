var gulp = require('gulp'),
    bower = require('gulp-bower'),
    connect = require('gulp-connect'),
    shell = require('gulp-shell'),
    vendor = require('gulp-concat-vendor'),
    del = require('del');

gulp.task('clean', function () {
  del(['public']);
});

gulp.task('bower:install', function () {
  return bower();
});

gulp.task('bower', ['bower:install'], function(){
  return gulp.src('bower_components/bootstrap/dist/css/*.min.css')
    .pipe(vendor('bs3.min.css'))
    .pipe(gulp.dest('public/css'));
});

gulp.task('style', function(){
  return gulp.src('src/css/*.css')
    .pipe(gulp.dest('public/css'));
});

gulp.task('connect', function () {
  connect.server({
    livereload: true
  });
});

gulp.task('open_in_browser', shell.task([
  'open http://localhost:8080'
]));

gulp.task('default', ['bower', 'clean', 'style', 'connect', 'open_in_browser']);
