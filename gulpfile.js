"use strict";

//----------------------------------------------------------------------
//  モジュール読み込み
//----------------------------------------------------------------------
const gulp = require("gulp");
const { src, dest, watch, series, parallel } = require("gulp");

const plumber = require("gulp-plumber");
const sassGlob = require("gulp-sass-glob-use-forward");
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssDeclarationSorter = require('css-declaration-sorter');

const compile = (done)=> {
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
const watchSass = () => watch("./src/scss/**/*.scss", compile);

// ========================================
// img最適化
// ========================================

const imageMin = require("gulp-imagemin");              // npm i -D gulp-imagemin@7.1.0
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");
const changed = require("gulp-changed");

const imgmin = (done)=> {
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
const imgMin = ()=> watch("./src/images/*" , series(imgmin));

// =========================
// parallel：並列処理
// =========================
exports.def = parallel(imgMin, watchSass);