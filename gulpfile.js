"use strict";

//----------------------------------------------------------------------
//  モジュール読み込み
//----------------------------------------------------------------------
const gulp = require("gulp");
const { src, dest, watch, series, parallel } = require("gulp");

// const plumber = require("gulp-plumber");
// const sassGlob = require("gulp-sass-glob-use-forward");
// const sass = require('gulp-sass')(require('sass'));
// const autoprefixer = require("gulp-autoprefixer");
// const cleancss = require("gulp-clean-css");
// const media = require("gulp-group-css-media-queries");
// const gulpPostcss = require('gulp-postcss');
// const cssDeclarationSorter = require('css-declaration-sorter');

// const bs = require("browser-sync");


// ========================================
// img最適化
// ========================================

// //----------------------------------------------------------------------
// //  モジュール読み込み
// //----------------------------------------------------------------------

const imageMin = require("gulp-imagemin");              // npm i -D gulp-imagemin@7.1.0
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");
const changed = require("gulp-changed");

// //----------------------------------------------------------------------
// //  関数定義
// //----------------------------------------------------------------------
function imagemin(done) {
    src("./src/images/*")
    .pipe(changed("./public/assets/images/[name]_min"))
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
    .pipe(dest("./public/assets/images/"));

    done();
}

function watchTask(done) {
  watch(
    ["./src/images/*"],
    series(imagemin)
  );    //	監視対象とするパスはお好みで
}
exports.img = series(watchTask);

// /************************************************************************/
// /*  END OF FILE                                                         */
// /************************************************************************/