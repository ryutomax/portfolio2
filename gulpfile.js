"use strict";

//----------------------------------------------------------------------
//  モジュール読み込み
//----------------------------------------------------------------------
const gulp = require("gulp");
const { src, dest, watch, series, parallel } = require("gulp");

const plumber = require("gulp-plumber");
const sassGlob = require("gulp-sass-glob-use-forward");
const sass = require('gulp-sass')(require('sass'));
// const autoprefixer = require("gulp-autoprefixer");
const postcss = require('gulp-postcss');
const cssDeclarationSorter = require('css-declaration-sorter');

function compile(done) {
  src("./src/scss/**/*.scss")

  .pipe( plumber() )                   // watch中にエラーが発生してもwatchが止まらないようにする
  .pipe( sassGlob() )                  // glob機能
  .pipe( sass({
      includePaths: ['./scss/']       // sassコンパイル
  }))
  .pipe(postcss([cssDeclarationSorter({order: 'smacss'})]))
  .pipe(dest("./src/css/"));

  done();
}
function sassWatch() {
  watch("./src/scss/**/*.scss" , series(compile));
}
exports.watch = series(sassWatch);

// ========================================
// img最適化
// ========================================

const imageMin = require("gulp-imagemin");              // npm i -D gulp-imagemin@7.1.0
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");
const changed = require("gulp-changed");

function imagemin(done) {
  src("./src/images/*")
  .pipe(changed("./dist/assets/images/[name]-min"))
  .pipe(
    imageMin([
      pngquant({
          quality: [0.6, 0.7],
          speed: 1,
      }),
      mozjpeg({ quality: 65 }),
      imageMin.svgo(),
      imageMin.optipng(),
      imageMin.gifsicle({ optimizationLevel: 3 }),
    ])
  )
  .pipe(dest("./dist/assets/images/"));
  done();
}
function imgWatch() {
  watch("./src/images/*" , series(imagemin));
}
exports.imgwatch = series(imgWatch);

// exports.imgMin = imagemin;
