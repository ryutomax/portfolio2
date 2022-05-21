const path = require('path');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const globImporter = require('node-sass-glob-importer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const ImageminMozjpeg = require("imagemin-mozjpeg");

module.exports = (env, argv) => {
  const PRODUCTION = argv.mode === 'production'

  return {
    entry: './src/js/entry.js',

    output: {
      filename: PRODUCTION
        ? 'assets/js/bundle-[hash].js'
        : 'assets/js/bundle.js',
      path: path.join(__dirname, 'dist'),
    },

    plugins: [
      new CleanWebpackPlugin([
        'dist/assets/style',
        'dist/assets/js',
      ]),

      new MiniCssExtractPlugin({
        filename: PRODUCTION
          ? 'assets/style/bundle-[hash].css'
          : 'assets/style/bundle.css',
      }),

      // ejs
      new HtmlWebpackPlugin({
        // inject: head,
        filename: 'index.html',
        template: 'src/ejs/index.ejs',
      }),
      new HtmlWebpackPlugin({
        filename: 'about/index.html',
        template: 'src/ejs/about/index.ejs',
      }),
      new CopyPlugin(
        PRODUCTION
          ? [
              // php
              {
                from: './src/api/*.php',
                to: path.resolve(__dirname, 'dist/api'),
                flatten: true,
              },
              //圧縮した画像をsrcのimagesフォルダからコピーして、distのimagesフォルダに出力する
              {
                from: `${path.resolve(__dirname, "src")}/images/`,
                to: `${path.resolve(__dirname, "dist/assets/")}/images/[name]-min.[ext]`
              },
            ]
          : []
      ),
      new ImageminPlugin({ //画像圧縮処理の指定
        test: /\.(jpe?g|png|gif|svg)$/i,
        plugins: [
          ImageminMozjpeg({
            quality: 75,
            progressive: true
          })
        ],
        pngquant: {
          quality: "70"
        },
        gifsicle: {
          interlaced: false,
          optimizationLevel: 10,
          colors: 256
        },
        svgo: {}
      })
    ],
    resolve: {
      extensions: [
        '.js', // for style-loader
      ],
    },
    devtool: PRODUCTION ? 'none' : 'source-map',

    optimization: {
      minimizer: PRODUCTION
        ? [
            // new UglifyJSPlugin({
            //   uglifyOptions: {
            //     compress: {
            //       drop_console: true,
            //     },
            //   },
            // }),
            new TerserPlugin({
              extractComments: false
            })
          ]
        : [],
    },
    module: {
      rules: [
        {
          test: /\.ejs$/,
          use: 'ejs-compiled-loader',
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader, // javascriptとしてバンドルせず css として出力する
            {
              loader: 'css-loader',
              options: {
                url: false, // sassで相対パスを書けるようにする
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: [
                  require('cssnano')({
                    preset: 'default',
                  }),
                  require('autoprefixer')({
                    grid: true,
                  }),
                ],
              },
            },
            {
              loader: 'sass-loader',
              options: {
                // importer: globImporter(),
                implementation: require("sass"),
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env', { modules: false }]],
              },
            },
          ],
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
        },
      ],
    },

    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      port: 8080,
      open: true,
    },
  }
}
