'use strict';
var gulp = require('gulp');
var req = require('gulp-load-plugins')();

function errorLog(error){
  console.error.bind(error);
  this.emit('end');
}

var paths = {
  html: ['./views/**/*.html'],
};

gulp.task('default',['html']);

gulp.task('html',function(){
  gulp.src(paths.html)
  .pipe(req.jsbeautifier({indent_size:2}))
  .pipe(req.removeEmptyLines())
  .pipe(req.htmlhint())
  .pipe(req.htmlhint.reporter("htmlhint-stylish"))
  .pipe(gulp.dest('./views/'));
});