var gulp = require('gulp');
var sass = require('gulp-sass') ;
var bower = require('gulp-bower');
var notify = require("gulp-notify") 
var server = require('gulp-express');
var sequence = require('gulp-sequence')

var config = {
  sassPath: 'public/styles/sass',
  bowerDir: 'public/bower_components'
}

gulp.task('bower', function() {
  return bower(config.bowerDir)
    .pipe(gulp.dest(config.bowerDir))
});

gulp.task('css', function() { 
  return gulp.src(config.sassPath + '/style.scss')
    .pipe(sass({ 
      errLogToConsole: true,
      outputStyle: 'expanded',
       includePaths: [  config.bowerDir + '/mini.css/src/mini/' ] 
    })) 
    .pipe(gulp.dest('./public/styles/css')); 
});

gulp.task('server', function() {
  server.run(['server.js']);

  gulp.watch(config.sassPath + '/**/*.scss', ['css']); 
});

gulp.task('default', sequence('bower', ['css'], 'server'));
