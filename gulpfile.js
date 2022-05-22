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
// const cleancss = require("gulp-clean-css");
// const media = require("gulp-group-css-media-queries");
const gulpPostcss = require('gulp-postcss');
const cssDeclarationSorter = require('css-declaration-sorter');

//----------------------------------------------------------------------
//
//----------------------------------------------------------------------
function compile(done) {
  src("./src/scss/**/*.scss")

  .pipe( plumber() )                   // watch中にエラーが発生してもwatchが止まらないようにする
  .pipe( sassGlob() )                  // glob機能
  .pipe( sass({
      includePaths: ['./scss/']       // sassコンパイル
  }))
  // .pipe( autoprefixer( /           / ベンダープレフィック自動付与(sass後)
  //   {
  //   cascade: false
  // }))
  .pipe(gulpPostcss(
      [cssDeclarationSorter({
              order: 'smacss'
          })]
  ))                                 //css整列
  // .pipe(media())                     // メディアクエリ統合
  .pipe(dest("./src/css/"));

  done();
}

// function min(done) {
//   src("./css_origin/*.css")

//   .pipe(plumber())                   // watch中にエラーが発生してもwatchが止まらないようにする
//   .pipe(cleancss())                  // 圧縮 コードの不要なインデントや改行を削除
//   .pipe(dest("./css_min/"));

//   done();
// }

function sassWatch() {
  // watch( "監視したいファイル(またはフォルダ)を指定" , 処理 );
  watch("./src/scss/**/*.scss" , series(compile));
}
exports.watch = series(sassWatch);


// ========================================
// img最適化
// ========================================-----------------------------------------------------------

const imageMin = require("gulp-imagemin");              // npm i -D gulp-imagemin@7.1.0
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");
const changed = require("gulp-changed");

function imagemin(done) {
    src("./src/images/*")
    .pipe(changed("./dist/images/[name]-min.[ext]"))
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
    .pipe(dest("./dist/images/"));

    done();
}

exports.imgMin = imagemin;
