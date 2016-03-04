'use strict';

var gulp      = require('gulp'),
    nodemon   = require('gulp-nodemon'),
    bs        = require('browser-sync'),
    reload    = bs.reload,
    when      = require('gulp-if'),
    shell     = require('gulp-shell');
/// added in legacy:
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var sass = require('gulp-sass');

// the paths to our app files
var paths = {
  // all our client app js files, not including 3rd party js files
  scripts: ['client/app/**/*.js'],
  html: ['client/app/**/*.html', 'client/index.html'],
  styles: ['client/styles/style.css']
};

gulp.task('sass', function () {
  return gulp.src('client/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('client/styles'));
});

// concat and minify .js
gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
      .pipe(concat('production.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('client/build'));
});
// concat and minify .css
gulp.task('styles', function() {
    return gulp.src(paths.styles)
      .pipe(concat('production.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssnano())
        .pipe(gulp.dest('client/build'));
});
// inject <link> and <script> tags into index.html
gulp.task('index', function(){
  gulp.src('./client/index.html')
    .pipe(inject(gulp.src(['./client/app/**/*.js', './client/styles/**/*.css'], {read: false}), {relative: true}))
    .pipe(gulp.dest('./client'));
});

gulp.task('watch', function() {
   // Watch .js files
  gulp.watch('client/app/**/*.js', ['index']);
   // Watch .css files
  gulp.watch('client/styles/**/*.css', ['index']);
  gulp.watch('client/sass/**/*.scss', ['sass']);
});
  //  // Watch image files
  // gulp.watch('src/images/**/*', ['images']);

// any changes made to your
// client side code will automagically refresh your page
// with the new changes
// BUGGY:
gulp.task('start', ['serve'], function () {
  bs({
    notify: true,
    // address for server,
    injectChanges: true,
    files: paths.scripts.concat(paths.html, paths.styles),
    proxy: 'localhost:8000'
  });
});

// start our node server using nodemon
gulp.task('serve', function () {
  nodemon({script: './server/server.js', ignore: 'node_modules/**/*.js'});
});

gulp.task('default', ['watch', 'start', 'index', 'scripts', 'styles', 'sass']);
