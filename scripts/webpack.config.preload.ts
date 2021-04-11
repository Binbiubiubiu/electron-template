import { isProductionMode } from './utils';
import path from 'path';
import webpack, { RuleSetRule, Template } from 'webpack';

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';

const r = (...args: string[]) => path.resolve(__dirname, '..', ...args);

const config: webpack.Configuration = {
  name: 'electron-preload',
  mode: isProductionMode ? 'production' : 'development',
  dependencies: ['electron-main'],
  // cache: {
  //   type: 'filesystem',
  // },
  entry: r('src', 'preload.ts'),
  output: {
    path: r('dist'),
    filename: 'preload.js',
  },
  target: 'electron-preload',
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
            cacheDirectory: true,
          },
        },
      },
    ],
  },

  devtool: 'source-map',
  // devtool: isProductionMode
  //   ? 'nosources-source-map'
  //   : 'eval-cheap-module-source-map',
  plugins: [
    new ProgressBarPlugin() as any,
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        mode: 'write-references',
        configFile: 'tsconfig-preload.json',
      },
    }),
  ],
  stats: 'errors-warnings',
  watch: true,
  watchOptions: {
    aggregateTimeout: 600,
    ignored: /node_modules/,
    poll: 1000,
  },
};

export default config;
