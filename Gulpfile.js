var gulp = require('gulp'),
    bower = require('gulp-bower'),
    connect = require('gulp-connect'),
    shell = require('gulp-shell'),
    vendor = require('gulp-concat-vendor'),
    mainBowerFiles = require('main-bower-files'),
    ngHtml2Js = require("gulp-ng-html2js"),
    concat = require("gulp-concat"),
    minifyHTML = require('gulp-minify-html'),
    uglify = require("gulp-uglify"),
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
  return gulp.src('src/css/*.css')
  .pipe(gulp.dest('public/css'));
});

gulp.task('vendor_js', ['bower'], function () {
  return gulp.src(mainBowerFiles())
  .pipe(concat("vendor.js"))
  // .pipe(uglify())
  .pipe(gulp.dest('public/js'));
});

gulp.task('templates', function(){
  return gulp.src('src/templates/**/*.html')
  .pipe(minifyHTML({
    empty: true,
    spare: true,
    quotes: true
  }))
  .pipe(ngHtml2Js({
    moduleName: "app_templates",
    prefix: "templates/"
  }))
  .pipe(concat("templates.js"))
  // .pipe(uglify())
  .pipe(gulp.dest('public/js'));
});

gulp.task('js', ['vendor_js', 'templates'], function () {
  return gulp.src([
    'public/js/vendor.js',
    'public/js/templates.js',
    'src/js/*.js'
  ])
  .pipe(concat("all.js"))
  // .pipe(uglify())
  .pipe(gulp.dest('public/js'));
});

gulp.task('html', function(){
  return gulp.src('src/*.html')
  .pipe(gulp.dest('public'));
});

gulp.task('connect', ['compile'], function () {
  return connect.server({
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
