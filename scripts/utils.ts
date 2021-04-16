import webpack from 'webpack';
import path from 'path';
import WebpackDevServer from 'webpack-dev-server';
import { spawn } from 'child_process';
import del from 'del';

export type WebpackConfiguration = webpack.Configuration & {
  devServer?: WebpackDevServer.Configuration;
};

export type EnvArgs = Record<string, unknown>;

export const isProductionMode = process.env.NODE_ENV === 'production';

export function pick(target: Record<string, unknown>, keys: string[]) {
  return keys.reduce((obj, key) => {
    if (key in target) {
      obj[key] = target[key];
    }
    return obj;
  }, {} as Record<string, unknown>);
}

export const r = (...args: string[]) => path.resolve(process.cwd(), ...args);

export function npmCommand(commandName: string) {
  return spawn(
    process.platform == 'win32' ? 'npm.cmd' : 'npm',
    ['run', commandName],
    {
      stdio: 'inherit',
      cwd: process.cwd(),
    },
  );
}

export function handleError(
  err?: Error,
  stats?: webpack.Stats | webpack.MultiStats,
) {
  if (err) {
    console.error(err.stack || err);
    process.exit(1);
  }

  const info = stats?.toJson();

  if (stats?.hasErrors()) {
    console.error(info?.errors);
  }

  if (stats?.hasWarnings()) {
    console.warn(info?.warnings);
  }
}

export async function clean() {
  await del(['app']);
}
