'use strict';

var gulp = require('gulp'),
  eslint = require('gulp-eslint'),
  istanbul = require('gulp-istanbul'),
  mocha = require('gulp-mocha'),
  argv = require('yargs').argv;

gulp.task('pre-coverage', function () {
  return gulp.src([
    '../lib/*.js'
  ])
  .pipe(istanbul({
    includeUntested: true
  }))
  .pipe(istanbul.hookRequire());
});

gulp.task('coverage', ['pre-coverage'], function () {
  return gulp.src(['../test/*.js'])
    .pipe(mocha())
    .pipe(istanbul.writeReports());
});

gulp.task('test', function () {
  var watch = false;

  if (argv.watch === true) {
    watch = true;
  }

  return gulp.src('../test/*-spec.js', {read: false})
    .pipe(mocha({
      reporter: 'spec',
      watch: watch
    }))
    .once('error', function (err) {
      throw err;
    });
});

gulp.task('lint', function () {
  return gulp.src(['../**/*.js', '!node_modules/**'], {read: true})
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
