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
  entry: {
    renderer: {
      import: r('src', 'App.tsx'),
      dependOn: 'share',
    },
    share: Object.keys(pkg.dependencies),
  },
  output: {
    path: r('dist'),
    filename: '[name].js',
  },
  target: 'electron-renderer',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        exclude: /node_modules/,
        include: r('src'),
        use: {
          loader: 'babel-loader',
          options: {
            // cacheDirectory: true,
          },
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
        configFile: 'tsconfig-renderer.json',
      },
    }),
  ],
  stats: 'errors-warnings',
  watchOptions: {
    aggregateTimeout: 600,
    ignored: /node_modules/,
    poll: 1000,
  },
};

export default config;
