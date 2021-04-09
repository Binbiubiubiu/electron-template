import mainConfig from './webpack.config.main';
import preloadConfig from './webpack.config.preload';
import rendererConfig from './webpack.config.renderer';

export const parallelism = 2;
export default [mainConfig, rendererConfig, preloadConfig];
