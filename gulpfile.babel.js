'use strict';

import gulp from 'gulp';
import gulpIf from 'gulp-if';
// TypeScript
import webpack from 'webpack-stream';
import uglify from 'gulp-uglify';
import saveLicense from 'uglify-save-license';
// Stylus
import stylus from 'gulp-stylus';
import concat from 'gulp-concat';
import nib from 'nib';
import rupture from 'rupture';
// Misc
import del from 'del';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sequence from 'run-sequence';

/*
 * Constants
 */
const Dir = {
  src: (path = '') => `./src${path && `/${path}`}`,
  dest: (path = '') => `./assets${path && `/${path}`}`,
};

const Config = {
  TypeScript: {
    src: Dir.src('javascripts/bundle.ts'),
    target: Dir.src('javascripts/**/*'),
    dest: Dir.dest('javascripts'),
    file: 'application.js',
  },
  Stylus: {
    src: Dir.src('stylesheets/bundle.styl'),
    target: Dir.src('stylesheets/**/*'),
    dest: Dir.dest('stylesheets'),
    file: 'application.css',
  },
};

const isProduction = process.env.NODE_ENV === 'production';

/*
 * Tasks
 */
gulp.task('typescript', () => {
  const {src, dest, file} = Config.TypeScript;
  return gulp.src(src)
    .pipe(webpack({
      output: {
        filename: file,
      },
      resolve: {
        extensions: ['', '.js', '.ts', '.tsx'],
      },
      module: {
        loaders: [
          {test: /\.tsx?$/, loader: 'ts-loader'},
          {test: /\.js$/, loader: 'transform?envify'},
        ]
      },
    }))
    .pipe(buffer())
    .pipe(gulpIf(isProduction, uglify({preserveComments: saveLicense})))
    .pipe(gulp.dest(dest));
});

gulp.task('stylus', () => {
  const {src, dest, file} = Config.Stylus;
  return gulp.src(src)
    .pipe(stylus({
      compress: isProduction,
      use: [nib(), rupture()]
    }))
    .pipe(concat(file))
    .pipe(gulp.dest(dest));
});

gulp.task('clean', () => del(Dir.dest()));

gulp.task('build', () => sequence(['typescript', 'stylus']));

gulp.task('watch', () => {
  gulp.watch(Config.TypeScript.target, ['typescript']);
  gulp.watch(Config.Stylus.target, ['stylus']);
});

gulp.task('develop', () => sequence(['build', 'watch']));
