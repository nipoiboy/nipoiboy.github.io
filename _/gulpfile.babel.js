'use strict';

import through2 from 'through2';
import glob from 'glob';
import gulp from 'gulp';
import gutil from 'gulp-util';
import gulpIf from 'gulp-if';
// JavaScript
import webpack from 'webpack-stream';
import uglify from 'gulp-uglify';
import saveLicense from 'uglify-save-license';
// CSS
import menthe from 'gulp-menthe';
import concat from 'gulp-concat';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
// Misc
import del from 'del';
import named from 'vinyl-named';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sequence from 'run-sequence';

/*
 * Constants
 */
const Dir = {
  src: (path = '') => `./src${path && `/${path}`}`,
  dest: (path = '') => `../assets${path && `/${path}`}`,
};

const Config = {
  JavaScript: {
    src: Dir.src('javascripts/bundle.ts'),
    target: [
      Dir.src('javascripts/**/*'),
      `!${Dir.src('javascripts/**/constants.ts')}`,
      `!${Dir.src('javascripts/**/style.ts')}`,
    ],
    dest: Dir.dest('javascripts'),
    file: 'application.js',
  },
  CSS: {
    src: Dir.src('javascripts/**/style.ts'),
    target: [
      Dir.src('javascripts/**/constants.ts'),
      Dir.src('javascripts/**/style.ts'),
    ],
    dest: Dir.dest('stylesheets'),
    file: 'application.css',
  },
};

const isProduction = process.env.NODE_ENV === 'production';

/*
 * Tasks
 */
gulp.task('javascript', () => {
  const {src, dest, file} = Config.JavaScript;
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
          {test: /\.tsx?$/, loader: 'ts'},
          {test: /\.js$/, loader: 'transform?envify'},
        ],
      },
    }))
    .pipe(buffer())
    .pipe(gulpIf(isProduction, uglify({preserveComments: saveLicense})))
    .pipe(gulp.dest(dest));
});

gulp.task('css', () => {
  const {src, dest, file} = Config.CSS;
  return gulp.src(src)
    .pipe(named((file) => file.path.split('/').slice(-3).join('/').replace(/\.ts$/, '')))
    .pipe(webpack({
      resolve: {
        extensions: ['', '.js', '.ts', '.tsx'],
      },
      module: {
        loaders: [
          {test: /\.ts$/, loader: 'ts'},
        ],
      },
    }))
    .pipe(menthe())
    .pipe(buffer())
    .pipe(concat(file))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest(dest));
});

gulp.task('clean', () => del(Dir.dest(), {force: true}));

gulp.task('build', () => sequence(['javascript', 'css']));

gulp.task('watch', () => {
  gulp.watch(Config.JavaScript.target, ['javascript']);
  gulp.watch(Config.CSS.target, ['css']);
});

gulp.task('develop', () => sequence(['build', 'watch']));
