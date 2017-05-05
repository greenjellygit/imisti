var gulp = require('gulp');
var gulpif = require('gulp-if') ;
var sass = require('gulp-sass') ;
var bower = require('gulp-bower');
var lazypipe = require('lazypipe');
var uglify = require('gulp-uglify');
var notify = require("gulp-notify") ;
var useref = require('gulp-useref');
var server = require('gulp-express');
var sequence = require('gulp-sequence');
var minifyCss = require('gulp-clean-css');
var ngAnnotate = require('gulp-ng-annotate');

var config = {
  sassPath: 'public/assets/styles/sass',
  bowerDir: 'public/bower_components'
}

gulp.task('bower', function() {
  return bower(config.bowerDir)
    .pipe(gulp.dest(config.bowerDir))
});

gulp.task('sass', function() { 
  return gulp.src(config.sassPath + '/style.scss')
    .pipe(sass({ 
      errLogToConsole: true,
      outputStyle: 'expanded',
       includePaths: [  config.bowerDir + '/mini.css/src/mini/' ] 
    })) 
    .pipe(gulp.dest('public/assets/styles/css')); 
});

var jsWork = lazypipe()
  .pipe(ngAnnotate)
  .pipe(uglify);

gulp.task('minification', function() {
  return gulp.src('public/index.html')
    .pipe(useref())
    .pipe(gulpif('*.js', jsWork()))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-assets', function() {
  return gulp.src(['public/assets/**', '!public/assets/styles{,/**}'])
    .pipe(gulp.dest('dist/assets/'));
});

gulp.task('copy-html', function() {
  return gulp.src(['public/js/**', '!public/js/controllers{,/**}', '!public/js/directives{,/**}', '!public/js/services{,/**}', '!public/js/app.js'])
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('server', function() {
  server.run(['server.js']);

  gulp.watch(config.sassPath + '/**/*.scss', ['sass']); 
});

gulp.task('default', sequence('bower', ['sass'], 'server'));
gulp.task('prod', sequence('sass', ['minification'], 'copy-assets', 'copy-html'));
