var gulp = require('gulp'),
    bower = require('gulp-bower'),
    connect = require('gulp-connect'),
    shell = require('gulp-shell'),
    vendor = require('gulp-concat-vendor'),
    mainBowerFiles = require('main-bower-files'),
    del = require('del');

gulp.task('bower', function () {
  return bower();
});

gulp.task('bootstrap', ['bower'], function () {
  gulp.src('bower_components/bootstrap/dist/css/*.min.css')
  .pipe(vendor('bs3.min.css'))
  .pipe(gulp.dest('public/css'));

  gulp.src('bower_components/bootstrap/dist/fonts/*')
  .pipe(gulp.dest('public/fonts'));
});

gulp.task('style', ['bootstrap'], function(){
  gulp.src('src/css/*.css')
  .pipe(gulp.dest('public/css'));
});

gulp.task('vendor_js', ['bower'], function () {
  gulp.src(mainBowerFiles())
  .pipe(gulp.dest('public/js'));
});

gulp.task('js', ['vendor_js'], function () {
  gulp.src('src/*.js')
  .pipe(gulp.dest('public'));
});

gulp.task('templates', function(){
  gulp.src('src/templates/**/*')
  .pipe(gulp.dest('public/templates'));
});

gulp.task('html', ['templates'], function(){
  gulp.src('src/*.html')
  .pipe(gulp.dest('public'));
});

gulp.task('connect', ['compile'], function () {
  connect.server({
    root: 'public',
    livereload: true
  });
});

gulp.task('open_in_browser', ['connect'], shell.task([
  'open http://localhost:8080'
]));

gulp.task('compile', [
  'style',
  'js',
  'html'
]);

gulp.task('clean', function () {
  del(['public']);
});

gulp.task('default', ['open_in_browser']);
