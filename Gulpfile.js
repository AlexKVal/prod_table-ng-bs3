var gulp = require('gulp'),
    bower = require('gulp-bower'),
    connect = require('gulp-connect'),
    shell = require('gulp-shell'),
    vendor = require('gulp-concat-vendor'),
    mainBowerFiles = require('main-bower-files'),
    del = require('del');

gulp.task('clean', function () {
  del(['public']);
});

gulp.task('bower', function () {
  return bower();
});

gulp.task('bootstrap', function () {
  gulp.src('bower_components/bootstrap/dist/css/*.min.css')
  .pipe(vendor('bs3.min.css'))
  .pipe(gulp.dest('public/css'));

  gulp.src('bower_components/bootstrap/dist/fonts/*')
  .pipe(gulp.dest('public/fonts'));
});

gulp.task('vendor_js', function () {
  gulp.src(mainBowerFiles())
  .pipe(gulp.dest('public/js'));
});

gulp.task('style', function(){
  gulp.src('src/css/*.css')
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

gulp.task('default', ['bower', 'clean',
  'bootstrap', 'style',
  'connect', 'open_in_browser'
]);
