import path from 'path';
import webpack, { HotModuleReplacementPlugin } from 'webpack';

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';

import { EnvArgs, isProductionMode, r } from './utils';

export default function (env: EnvArgs, argv?: EnvArgs): webpack.Configuration {
  return {
    name: 'electron-main',
    mode: isProductionMode ? 'production' : 'development',
    dependencies: ['electron-preload'],
    cache: {
      type: 'filesystem',
    },
    entry: r('src', 'main'),
    output: {
      path: r('app'),
      filename: 'main.js',
      // clean: true,
    },
    target: 'electron-main',
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    devtool: isProductionMode
      ? 'nosources-source-map'
      : 'eval-cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.ts/,
          exclude: /node_modules/,
          include: r('src', 'main'),
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        },
      ],
    },
    plugins: [
      // new ProgressBarPlugin() as any,
      new CopyPlugin({
        patterns: [{ from: 'public', to: './' }],
      }) as any,
      new ForkTsCheckerWebpackPlugin({
        logger: {
          infrastructure: 'silent',
          issues: 'silent',
          devServer: false,
        },
        typescript: {
          mode: 'write-references',
          configFile: 'tsconfig-main.json',
        },
      }),
    ],
    stats: 'errors-only',
    // watch: !isProductionMode,
    watchOptions: {
      aggregateTimeout: 600,
      ignored: '!(src/main/**)',
      poll: 1000,
    },
  };
}
