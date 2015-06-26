/**
 * gulpfile.babel.js
 * - build system の設定を定義
 */

import pkg        from './package.json';
import gulp       from 'gulp';
import buffer     from 'vinyl-buffer';
import source     from 'vinyl-source-stream';
import assign     from 'object-assign';
import loader     from 'gulp-load-plugins';
import watchify   from 'watchify';
import browserify from 'browserify';

let $ = loader();

let bundleOpts     = assign({}, watchify.args, {debug: true, entries: ['./src/eveemi.js'], standalone: 'EveEmi'});
let bundler        = watchify(browserify(bundleOpts));
let bundle         = () => {
  bundler
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

let path = {
  src: {
    js: 'src/*.js'
  },
  dest: {
    to: 'dest/'
  }
};

/**
 * default task
 */
gulp.task('default', ['js:bundle'], () => {
  bundler.on('update', bundle);
  bundler.on('log',    $.util.log);
});

/**
 * js:bundle task
 */
gulp.task('js:bundle', bundle);

/**
 * js:build task
 */
gulp.task('build', () => {
  // uncompressed
  gulp.src(path.src.js)
    .pipe($.header(header))
    .pipe(gulp.dest(path.dest.to));

  // minifiy
  gulp.src(path.src.js)
    .pipe($.uglify())
    .pipe($.header(header))
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest(path.dest.to));
});

gulp.task('test', () => {
  gulp.src('test/**/*.js')
    .pipe($.espower())
    .pipe($.mocha());
});
