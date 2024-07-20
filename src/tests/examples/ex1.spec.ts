import { test } from '@page-manager';
import { allure } from 'allure-playwright';
import { getTestData } from '@test-env';
import * as process from 'node:process';
import { logger } from '@utils/log';

/**
 * This is an example Suite
 * It's contains tests that will be executed
 */
test.describe('Example Suite', () => {
  test.beforeEach(async () => {
    // this will be executed before each test of this suite
    // added any setup code here
  });

  test('Example test script 1', { tag: '@Example' }, async ({ loginPage }) => {
    await allure.description('This is the description of the test');
    await allure.tags('@Example');
    await allure.issue('https://example.com/docs', 'OWS-Example-Id');
    await allure.step('Open application', async () => {
      logger.info('get env');
      logger.info(process.env.ALLURE_RESULTS_DIR);
      await loginPage.launchApp();
    });
    await allure.step('Input username and password', async () => {
      const user = await getTestData().users;
      await loginPage.fillForm(user.osa.username, user.osa.password);
    });
  });
});
