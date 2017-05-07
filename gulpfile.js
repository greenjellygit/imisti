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
  jsPath: 'public/js',
  htmlPath: 'public/js/templates',
  assetsPath: 'public/assets',
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

gulp.task('concatenation', function() {
  return gulp.src('public/index.html')
    .pipe(useref())
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

gulp.task('copy-angular-i18n', function() {
  return gulp.src([config.bowerDir + '/angular-i18n/angular-locale_en-us.js', config.bowerDir + '/angular-i18n/angular-locale_pl-pl.js', config.bowerDir + '/angular-i18n/angular-locale_ru-ru.js'])
    .pipe(gulp.dest('dist/js/external/angular-i18n/'));
});

gulp.task('copy-angular-i18n-minified', function() {
  return gulp.src([config.bowerDir + '/angular-i18n/angular-locale_en-us.js', config.bowerDir + '/angular-i18n/angular-locale_pl-pl.js', config.bowerDir + '/angular-i18n/angular-locale_ru-ru.js'])
    .pipe(jsWork())
    .pipe(gulp.dest('dist/js/external/angular-i18n/'));
});

gulp.task('watch', function() {
  gulp.watch(config.sassPath + '/**/*.scss', ["reload-css"]); 
  gulp.watch(config.jsPath + '/**/*.js', ["reload-js"]); 
  gulp.watch(config.htmlPath + '/**/*.html', ["reload-html"]); 
  gulp.watch(config.assetsPath + '/**/*.*', ["reload-assets"]); 
});

gulp.task('reload-css', function(callback) {
  sequence('sass', 'concatenation', 'copy-assets')(callback);
});

gulp.task('reload-html', function(callback) {
  sequence('copy-html')(callback);
});

gulp.task('reload-js', function(callback) {
  sequence('concatenation')(callback);
});

gulp.task('reload-assets', function(callback) {
  sequence('copy-assets')(callback);
});

gulp.task('server', function() {
  server.run(['server.js']);
});

gulp.task('dev', sequence('bower', ['sass'], ['concatenation'], 'copy-assets', 'copy-html', 'copy-angular-i18n', 'watch', 'server'));
gulp.task('prod', sequence('sass', ['minification'], 'copy-assets', 'copy-html', 'copy-angular-i18n-minified'));
