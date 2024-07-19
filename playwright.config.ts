import { defineConfig, devices } from '@playwright/test';
import os from 'os';

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
    ['line'],
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
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'PoC - OS with Playwright',
      use: {
        ...devices['Desktop Chrome'],
        // For browser actions
        headless: true,
      },
      // using for verify the test, all expect func will be set the timeout=10s
      expect: {
        timeout: 10 * 1000,
      },
    },
  ],
});
