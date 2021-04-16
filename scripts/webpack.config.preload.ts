import path from 'path';
import { isProductionMode, WebpackConfiguration, EnvArgs } from './utils';

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';

const r = (...args: string[]) => path.resolve(__dirname, '..', ...args);

export default function (env: EnvArgs, argv?: EnvArgs): WebpackConfiguration {
  return {
    name: 'electron-preload',
    mode: isProductionMode ? 'production' : 'development',
    cache: {
      type: 'filesystem',
    },
    entry: r('src', 'preload'),
    output: {
      path: r('app'),
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
          include: r('src', 'preload'),
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        },
      ],
    },

    devtool: isProductionMode
      ? 'nosources-source-map'
      : 'eval-cheap-module-source-map',
    plugins: [
      // new ProgressBarPlugin() as any,
      new ForkTsCheckerWebpackPlugin({
        logger: {
          infrastructure: 'silent',
          issues: 'silent',
          devServer: false,
        },
        typescript: {
          mode: 'write-references',
          configFile: 'tsconfig-preload.json',
        },
      }),
    ],
    stats: 'errors-only',
    // watch: !isProductionMode,
    watchOptions: {
      aggregateTimeout: 600,
      ignored: '!(src/preload/**)',
      poll: 1000,
    },
  };
}
