"use strict";

const path = require('path');

const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
// const ImageminPlugin = require("imagemin-webpack-plugin").default;
// const ImageminMozjpeg = require("imagemin-mozjpeg");

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
            ]
          : []
      ),
    ],
    resolve: {
      extensions: ['.js', ], // for style-loader
    },
    devtool: PRODUCTION ? 'none' : 'source-map',

    optimization: {
      minimizer: PRODUCTION
        ? [
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
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader, // javascriptとしてバンドルせず cssファイル として出力する
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
