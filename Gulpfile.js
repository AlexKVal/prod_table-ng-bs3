var gulp = require('gulp');
var bower = require('gulp-bower');

gulp.task('bower:install', function () {
  return bower();
});

gulp.task('bower', ['bower:install'], function(){

});

gulp.task('default', ['bower']);
