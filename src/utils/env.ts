import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

export const hasProcessEnv = (name: string): boolean => name in process.env;

export const getRequiredProcessEnv = (name: string): string => {
  const envVar = process.env[name]?.trim();

  if (!envVar) {
    throw new Error(`env var: ${name} not found`);
  }

  return envVar;
};

export function getOptionalProcessEnv<T>(name: string): null | string;
export function getOptionalProcessEnv<T>(name: string, defaultVar: T): (T extends NonNullable<T> ? T : NonNullable<T> | null) | string;

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function getOptionalProcessEnv<T>(name: string, defaultVar?: T | undefined): (null | T) | string {
  return hasProcessEnv(name) ? getRequiredProcessEnv(name) : defaultVar ?? null;
}

/* eslint-disable no-console */
export const setupEnv = (rootDir = process.cwd()) => {
  const env = process.env.NODE_ENV;

  if (env && fs.existsSync(path.join(rootDir, `.env.${env}`))) {
    if (env !== 'test') {
      console.log(`Running in ${env} environment`);
    }

    dotenv.config({ path: path.join(rootDir, `.env.${env}`) });
  } else if (fs.existsSync(path.join(rootDir, '.env'))) {
    console.log('No Environment Set/Not Found! Running default .env file');
    dotenv.config();
  } else {
    console.log('No Environment Set/Not Found! Hope you have your environment declared :O');
  }
};
/* eslint-enable no-console */
