import mainConfig from './webpack.config.main';
import preloadConfig from './webpack.config.preload';
import rendererConfig from './webpack.config.renderer';
import os from 'os';

export const parallelism = os.cpus;
export default [mainConfig, rendererConfig, preloadConfig];
