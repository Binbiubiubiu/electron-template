import path from 'path';
import webpack from 'webpack';

import WebpackDevServer from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const r = (...args: string[]) => path.resolve(__dirname, '..', ...args);

const config: webpack.Configuration & {
  devServer: WebpackDevServer.Configuration;
} = {
  entry: r('src', 'main.tsx'),
  output: {
    path: r('dist'),
    filename: '[name].[contentdash].js',
  },
  mode: 'development',
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
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
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: r('public', 'index.html') }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};

export default config;
