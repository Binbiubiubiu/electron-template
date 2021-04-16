import webpack from 'webpack';
import waitPort from 'wait-port';
import chalk from 'chalk';
import electronmon from 'electronmon';

import webpackConfig from './webpack.config';
import { handleError, npmCommand, r } from './utils';

let app: any | null;

const compiler = webpack(webpackConfig.slice(1));

(async function () {
  await clean();
  npmCommand('watch');
})();

waitPort({
  host: 'localhost',
  port: 9000,
  output: 'silent',
})
  .then((open) => {
    if (!open) {
      return;
    }
    compiler.watch({}, async (err?: Error, stats?: webpack.MultiStats) => {
      handleError(err, stats);
      if (app != null) {
        app.restart();
        return;
      }
      app = await electronmon({
        cwd: r('app'),
        patterns: [''],
        logLevel: 'error',
      });
    });
  })
  .catch((err) => {
    console.log(err);
    console.log(chalk.red('renderer process is Error'));
    return;
  });
