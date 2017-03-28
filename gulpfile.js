'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var eslint = require('gulp-eslint');
var argv = require('yargs').argv;

gulp.task('test', function (cb) {
  var watch = false;

  if (argv.watch === true) {
    watch = true;
  }

  gulp.src('./**/*-spec.js', {read: false})
    .pipe(mocha({
      reporter: 'spec',
      watch: watch
    }))
    .once('error', function () {
      cb();
      process.exit(1);
    })
    .once('end', function () {
      cb();
      process.exit();
    });
});

gulp.task('lint', function () {
  return gulp.src(['**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
