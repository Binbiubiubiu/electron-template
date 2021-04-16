import mainConfig from './webpack.config.main';
import preloadConfig from './webpack.config.preload';
import rendererConfig from './webpack.config.renderer';
// import os from 'os';

const env = process.env;
// export const parallelism = os.cpus;
export default [rendererConfig(env), preloadConfig(env), mainConfig(env)];
