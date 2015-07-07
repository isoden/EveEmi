/**
 * gulpfile.babel.js
 * - build system の設定を定義
 */

import run        from 'run-sequence';
import del        from 'del';
import pkg        from './package.json';
import gulp       from 'gulp';
import buffer     from 'vinyl-buffer';
import source     from 'vinyl-source-stream';
import assign     from 'object-assign';
import loader     from 'gulp-load-plugins';
import watchify   from 'watchify';
import browserify from 'browserify';

const SRC_FILE     = './src/eveemi.js';
const DEST_FILE    = './dest/eveemi.js';
const DEST_DIR     = './dest';
const PACKAGE_NAME = 'EveEmi';

let $              = loader();
let bundleOpts     = assign({}, watchify.args, {debug: true, entries: [SRC_FILE], standalone: PACKAGE_NAME});
let bundler        = watchify(browserify(bundleOpts));
let bundle         = () => {
  return bundler
    .bundle()
    .on('error', err => $.util.log(err.message))
    .pipe(source('eveemi.js'))
    .pipe(buffer())
    .pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./dest'));
};

let header = `
/*!
 * ${pkg.name} v${pkg.version}
 * ${pkg.repository.url}
 *
 * Copyright (c) ${new Date().getFullYear()} ${pkg.author.name}
 * Licensed under the MIT license.
 */

`;

gulp.task('default', ['bundle'], () => {
  $.watch(SRC_FILE, () => run('eslint'));

  bundler.on('update', bundle);
  bundler.on('log'   , $.util.log);
});

gulp.task('eslint', () => {
  gulp.src(SRC_FILE)
    .pipe($.plumber())
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failOnError());
});

gulp.task('bundle', bundle);

gulp.task('build', () => {
  run('bundle', () => {
    gulp.src(DEST_FILE)
      .pipe($.header(header))
      .pipe(gulp.dest(DEST_DIR))
      .pipe($.uglify({preserveComments: 'some'}))
      .pipe($.rename({suffix: '.min'}))
      .pipe(gulp.dest(DEST_DIR));
  })
});

gulp.task('test', () => {
  return gulp.src('test/*.js')
    .pipe($.mocha());
});
