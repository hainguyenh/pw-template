import path from 'path';
import { test } from '@page-manager';
import { getEnv } from '@test-env';
import { Locator } from '@playwright/test';
import { existsSync, mkdirSync, promises } from 'fs';
import { logger } from '@custom-log';
import moment from 'moment';
import { getPage } from '@utils/base';

//   /**
//    * take the screenshot and return the path
//    * @param name: name of screenshot
//    * @param locator if locator is provided then take screenshot of locator
//    * @returns full path of screenshot
//    */
export async function takeScreenshot(name?: string, locator?: Locator, fullPage: boolean = false): Promise<string> {
  const screenshotDir = _getScreenshotDir();

  if (!existsSync(screenshotDir)) {
    mkdirSync(screenshotDir, { recursive: true });
  }
  const fullPath = path.join(screenshotDir, name ?? moment().format('yyyyMMMddhhmmss')) + '.png';
  logger.info(`Taking screenshot: ${fullPath}`);
  if (locator) {
    await locator
      .screenshot({
        path: fullPath,
        timeout: 10000,
        type: 'png',
      })
      .catch(async error => {
        logger.error(`An error occurred when trying to capture the locator.\n${error}`);
        await getPage().screenshot({
          fullPage: fullPage,
          path: fullPath,
          type: 'png',
        });
      });
  } else {
    await getPage().screenshot({
      path: fullPath,
    });
  }
  return fullPath;
}

/**
 //    * Take a screenshot and return the Base64 encoded string.
 //    * @param name: Name of the screenshot (optional)
 //    * @param locator Element locator for a specific area screenshot (optional)
 //    * @param fullPage Take a screenshot of the full page (optional)
 //    * @returns Base64 encoded string of the screenshot
 //    */
export async function takeScreenshot64(name?: string, locator?: Locator, fullPage: boolean = false): Promise<Buffer> {
  const filePath = await takeScreenshot(name, locator, fullPage);
  return await promises.readFile(filePath); // Read image data as a buffer
}

/**
 * get the parents path of screenshot by ENV variable
 * @returns full parents path of screenshot directory
 */
export function _getScreenshotDir(): string {
  const screenshotDir = getEnv.SCREENSHOT_DIR;
  if (!screenshotDir) {
    throw new Error('Missing environment variable: SCREENSHOT_DIR');
  }

  const testTitle = test.info().title.replace(/\W+/g, '-'); // Sanitize test title for path
  return path.join(screenshotDir, testTitle);
}
