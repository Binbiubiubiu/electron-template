import { isProductionMode } from './utils';
import path from 'path';
import webpack, { RuleSetRule, Template } from 'webpack';

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

import pkg from '../package.json';

const r = (...args: string[]) => path.resolve(__dirname, '..', ...args);

const config: webpack.Configuration = {
  mode: isProductionMode ? 'production' : 'development',
  entry: r('src', 'App.tsx'),
  // entry: {
  //   preload: {
  //     import: r('src', 'App.tsx'),
  //     dependOn: 'share',
  //   },
  //   share: Object.keys(pkg.dependencies),
  // },
  output: {
    path: r('dist'),
    filename: 'preload.js',
  },
  target: 'web', //'electron-preload',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(le|s?c)ss/i,
        use: [
          isProductionMode ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {},
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
      }),
    ],
  },
  devtool: 'source-map',
  // devtool: isProductionMode
  //   ? 'nosources-source-map'
  //   : 'eval-cheap-module-source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: isProductionMode ? '[name].[contenthash].css' : '[name].css',
    }),
    new ProgressBarPlugin() as any,
    new HtmlWebpackPlugin({
      template: r('public', 'index.html'),
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        mode: 'write-references',
        configFile: 'tsconfig-preload.json',
      },
    }),
  ],
  stats: 'errors-warnings',
};

export default config;
