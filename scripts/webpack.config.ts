import mainConfig from './webpack.config.main';
import preloadConfig from './webpack.config.preload';

export const parallelism = 2;
export default [mainConfig, preloadConfig];
