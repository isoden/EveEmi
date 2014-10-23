gulp           = require 'gulp'
$              = do require 'gulp-load-plugins'
stylish        = require 'jshint-stylish'
pkg            = require './package.json'
{EventEmitter} = require 'events'

header = """
/*!
 * #{pkg.name} v#{pkg.version}
 * #{pkg.repository.url}
 *
 * Copyright (c) #{new Date().getFullYear()} #{pkg.author.name}
 * Licensed under the MIT license.
 */


"""

config =
    coffee: false
    ts: false

config.altJS = do ->
        config.coffee || config.ts

path =
    src:
        to: 'src/'
        js: 'src/*.js'
        alt: do () ->
            if config.coffee
                'src/*.coffee'
            else if config.ts
                'src/*.ts'
            else
                'src/*.js'
    dest:
        to: 'dest/'

###
 * @task watch
 * @public
###
gulp.task 'watch', ->
    gulp.watch path.src.alt, ['_compile_jshint']

###
 * @task build
 * @public
###
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

###
 * @task _jshint
 * @private
###
gulp.task '_compile_jshint', ->
    gulp.src path.src.alt
        .pipe $.plumber()
        .pipe $.if(
                config.altJS, $.if(config.coffee, $.coffee(), $.typescript())
            )
        .pipe $.jshint()
        .pipe $.jshint.reporter(stylish)
        .pipe $.if config.altJS, gulp.dest path.src.to
