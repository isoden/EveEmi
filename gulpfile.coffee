$              = do require 'gulp-load-plugins'
pkg            = require './package.json'
gulp           = require 'gulp'
buffer         = require 'vinyl-buffer'
source         = require 'vinyl-source-stream'
assign         = require 'object-assign'
watchify       = require 'watchify'
browserify     = require 'browserify'

bundleOpts     = assign({}, watchify.args, {debug: true, entries: ['./src/eveemi.js'], standalone: 'EveEmi'})
bundler        = watchify(browserify(bundleOpts))
bundle         = ->
  bundler
    .bundle()
    .on('error', (err) -> $.util.log(err.message))
    .pipe(source('eveemi.js'))
    .pipe(buffer())
    .pipe($.sourcemaps.init(loadMaps: true))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./dest'))

header = """
/*!
 * #{pkg.name} v#{pkg.version}
 * #{pkg.repository.url}
 *
 * Copyright (c) #{new Date().getFullYear()} #{pkg.author.name}
 * Licensed under the MIT license.
 */

"""

path =
  src:
    js: 'src/*.js'
  dest:
    to: 'dest/'

# default
# ========================================
gulp.task 'default', ['js:bundle'], ->
  bundler.on('update', bundle)
  bundler.on('log',    $.util.log)

# js:bundle
# ========================================
gulp.task 'js:bundle', bundle

# build
# ========================================
gulp.task 'build', ->
  # uncompressed
  gulp.src path.src.js
    .pipe $.header header
    .pipe gulp.dest path.dest.to

  # minifiy
  gulp.src path.src.js
    .pipe $.uglify()
    .pipe $.header header
    .pipe $.rename suffix: '.min'
    .pipe gulp.dest path.dest.to
