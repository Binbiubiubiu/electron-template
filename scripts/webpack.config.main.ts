import path from 'path';
import webpack from 'webpack';

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';

import { isProductionMode } from './utils';

const r = (...args: string[]) => path.resolve(__dirname, '..', ...args);

const config: webpack.Configuration = {
  entry: r('src', 'main.ts'),
  output: {
    path: r('dist'),
    filename: 'main.js',
    clean: true,
  },
  mode: 'development',
  target: 'electron-main',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  devtool: 'cheap-source-map',
  // devtool: isProductionMode
  //   ? 'nosources-source-map'
  //   : 'eval-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.ts/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // cacheDirectory: true,
          },
        },
      },
    ],
  },
  plugins: [
    new ProgressBarPlugin() as any,
    new CopyPlugin({
      patterns: [{ from: 'public', to: './' }],
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        mode: 'write-references',
        configFile: 'tsconfig-main.json',
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
