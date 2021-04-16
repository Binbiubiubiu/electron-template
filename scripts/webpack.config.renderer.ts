import path from 'path';

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

import { isProductionMode, WebpackConfiguration, EnvArgs, r } from './utils';
import chalk from 'chalk';

export default function (env: EnvArgs, argv?: EnvArgs): WebpackConfiguration {
  return {
    name: 'electron-renderer',
    mode: isProductionMode ? 'production' : 'development',
    cache: {
      type: 'filesystem',
    },
    entry: {
      share: [
        '@loadable/component',
        'antd',
        'mobx',
        'mobx-react-lite',
        'react',
        'react-dom',
        'react-router-dom',
      ],
      renderer: r('src', 'renderer'),
    },
    output: {
      path: r('app'),
      filename: '[name].js',
      globalObject: 'this',
    },
    target: 'web', //'electron-renderer',
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?/,
          exclude: /node_modules/,
          include: r('src', 'renderer'),
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
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
    devtool: isProductionMode
      ? 'nosources-source-map'
      : 'eval-cheap-module-source-map',
    plugins: [
      new MiniCssExtractPlugin({
        filename: isProductionMode ? '[name].[contenthash].css' : '[name].css',
      }),
      new ProgressBarPlugin({
        format:
          ' renderer [:bar] ' +
          chalk.green.bold(':percent') +
          ' (:elapsed seconds)',
        total: 100,
      }) as any,
      new HtmlWebpackPlugin({
        template: r('public', 'index.html'),
      }),
      new ForkTsCheckerWebpackPlugin({
        logger: {
          infrastructure: 'silent',
          issues: 'silent',
          devServer: false,
        },
        typescript: {
          mode: 'write-references',
          configFile: 'tsconfig-renderer.json',
        },
      }),
    ],
    stats: 'errors-only',
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      // compress: true,
      port: 9000,
      // writeToDisk: true,
      clientLogLevel: 'none',
      watchOptions: {
        aggregateTimeout: 600,
        ignored: '!(src/renderer/**)',
        poll: 1000,
      },
    },
    // watch: !isProductionMode,
    // watchOptions: {
    //   aggregateTimeout: 600,
    //   ignored: '!(src/renderer/**)',
    //   poll: 1000,
    // },
  };
}
