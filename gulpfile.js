'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const gulpMinify = require('gulp-minify');
const cssmin = require('gulp-cssmin');

gulp.task('build', () => {
  gulp.src('./public-dev/javascripts/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulpMinify({
      ext: {
        src: '-debug.js',
        min: '.js'
      },
      noSource: true,
      exclude: [],
      ignoreFiles: ['.combo.js', '-min.js']
    }).on('error', (e) => {
      console.log(e);
    }))
    .pipe(gulp.dest('public/javascripts/'));

  gulp.src('./public-dev/stylesheets/**/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest('public/stylesheets/'));
});

gulp.task('css', ()=>{
  gulp.src('./public-dev/stylesheets/**/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest('public/stylesheets/'));
});