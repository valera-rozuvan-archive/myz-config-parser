'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test', function (cb) {
  gulp.src('./**/*-spec.js', {read: false})
    .pipe(mocha({
      reporter: 'spec'
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
