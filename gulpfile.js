var gulp = require('gulp');
var sass = require('gulp-sass') ;
var bower = require('gulp-bower');
var notify = require("gulp-notify") 
var server = require('gulp-express');
var sequence = require('gulp-sequence')

var config = {
  sassPath: './styles/sass',
  bowerDir: './bower_components'
}

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest(config.bowerDir))
});

gulp.task('css', function() { 
  return gulp.src(config.sassPath + '/style.scss')
    .pipe(sass({ 
      errLogToConsole: true,
      outputStyle: 'expanded',
       includePaths: [  config.bowerDir + '/mini.css/src/mini/' ] 
    })) 
    .pipe(gulp.dest('./styles/css')); 
});

gulp.task('server', function() {
  server.run(['serve.js']);

  gulp.watch(config.sassPath + '/**/*.scss', ['css']); 
});

gulp.task('default', sequence('bower', ['css'], 'server'));