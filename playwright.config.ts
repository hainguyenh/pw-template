import { defineConfig, devices } from '@playwright/test';
import os from 'os';

const customLoggerPath = require.resolve('src/utils/log/custom-logger.ts');
const envDetails = {
  environment: process.env.ENV,
  framework: 'playwright',
  nodeVersion: process.version,
  os: process.platform,
  name: os.userInfo().username,
};

export default defineConfig({
  testDir: 'src/tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  outputDir: 'test-results',
  reporter: [
    [customLoggerPath],
    [
      'allure-playwright',
      {
        outputFolder: 'test-results/jsons',
        detail: false,
        stdout: false,
        suiteTitle: false,
        environmentInfo: {
          FRAMEWORK: envDetails.framework,
          NODE_VERSION: envDetails.nodeVersion,
          OS: envDetails.os,
          USER: envDetails.name,
          ENVIRONMENT: envDetails.environment,
        },
      },
    ],
  ],
  globalSetup: require.resolve('./src/config-test/global-setup.ts'),
  globalTeardown: require.resolve('./src/config-test/global-teardown.ts'),
  use: {
    headless: true,
    /* Sets extra headers for CloudFlare. */
    extraHTTPHeaders: {
      'CF-Access-Client-Id': process.env.CF_CLIENT_ID || '',
      'CF-Access-Client-Secret': process.env.CF_CLIENT_SECRET || '',
    },
    ignoreHTTPSErrors: true,
    acceptDownloads: true,
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'PoC with Playwright',
      use: {
        ...devices['Desktop Chrome'],
        // For browser actions
      },
      // using for verify the test, all expect func will be set the timeout=10s
      expect: {
        timeout: 10 * 1000,
      },
    },
  ],
});
