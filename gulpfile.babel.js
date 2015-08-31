/**
 * gulpfile.js
 * - build system の設定を定義
 */

import run        from 'run-sequence';
import del        from 'del';
import pkg        from './package.json';
import gulp       from 'gulp';
import tsify      from 'tsify';
import {exec}     from 'child_process';
import buffer     from 'vinyl-buffer';
import source     from 'vinyl-source-stream';
import assign     from 'object-assign';
import loader     from 'gulp-load-plugins';
import watchify   from 'watchify';
import browserify from 'browserify';

const SRC_FILE     = './lib/eveemi.js';
const DEST_FILE    = './eveemi.js';
const DEST_DIR     = './';
const PACKAGE_NAME = 'EveEmi';

let $              = loader();
let bundleOpts     = assign({}, watchify.args, {debug: true, entries: [SRC_FILE], standalone : PACKAGE_NAME});
let bundler        = watchify(browserify(bundleOpts)).plugin(tsify, {
  target : 'ES3',
  module : 'umd'
});
let bundle         = function () {
  return bundler
    .bundle()
    .on('error', err => $.util.log(err.message))
    .pipe(source('eveemi.js'))
    .pipe(buffer())
    .pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./'));
};

var header = `/*!
 * EveEmi.js v${pkg.version}
 * ${pkg.repository.url}
 *
 * Copyright (c) ${new Date().getFullYear()} ${pkg.author.name}
 * Licensed under the MIT license.
 */

`;

gulp.task('default', ['bundle'], function () {
  exec('npm run watch');
  bundler.on('log'   , $.util.log);
  bundler.on('update', bundle);
});

gulp.task('bundle', bundle);

gulp.task('build', function () {
  run('bundle', function () {
    gulp.src(DEST_FILE)
      .pipe($.header(header))
      .pipe(gulp.dest(DEST_DIR))
      .pipe($.uglify({preserveComments: 'some'}))
      .pipe($.rename({suffix: '.min'}))
      .pipe(gulp.dest(DEST_DIR));
  })
});

gulp.task('test', function () {
  return gulp.src('test/*.js')
    .pipe($.mocha());
});
