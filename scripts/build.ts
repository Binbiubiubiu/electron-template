import fs from 'fs';
import webpack from 'webpack';
import { clean, handleError } from './utils';
import webpackConfig from './webpack.config';

const compiler = webpack(webpackConfig);

(async function () {
  await clean();
  compiler.run(handleError);
})();
