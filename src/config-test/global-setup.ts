import dotenv from 'dotenv';
import { logger } from '@custom-log';
import { FullConfig } from '@playwright/test';

export const envConfig = () => {
  dotenv.config();
  if (process.env.ENV) {
    logger.info(`Running with env: ${process.env.ENV}`);
    dotenv.config({
      path: `${__dirname}/../../env/.env.${process.env.ENV}`,
      override: true,
    });
  } else {
    // Default env in case no specific env is used
    logger.info('Using default env - RC: ', __dirname);
    dotenv.config({
      path: `${__dirname}/../../env/.env.rc`,
      override: true,
    });
  }
};

// eslint-disable-next-line require-await, @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
async function globalSetup(_config: FullConfig) {
  envConfig();
  // Additional setup code here
}

export default globalSetup;
