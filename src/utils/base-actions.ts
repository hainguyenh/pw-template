// import { type Locator, type Page, expect, test } from '@playwright/test';
// import { existsSync, mkdirSync, promises } from 'fs';
// import { allure } from 'allure-playwright';
// import { getEnv } from '@testdata/env';
// import { decode } from '@utils/hex-converter';
// import moment from 'moment';
// import { logger } from '@utils/log/custom-logger';
// import path from 'path';
// import UiElement from './base-control';

// export default class BaseActions {
//   protected readonly page: Page;
//   readonly ELEMENT_DISPLAY_TIMEOUT = 10 * 1000;
//   readonly IMAGE_TYPE = 'image/png';

//   constructor(page: Page) {
//     this.page = page;
//   }

//   /**
//    * Click on element
//    * @param locator element locator
//    * @param name name of locator
//    * @param timeout timeout for waiting default is 10s
//    */
//   public async click(locator: Locator | UiElement, name?: string | undefined, timeout?: number): Promise<void> {
//     if (locator instanceof UiElement) {
//       name ?? (name = locator.name ?? name);
//       locator = locator.locator;
//     }
//     logger.info(`Clicking to [${name ?? 'element'}] field`);
//     if (name === undefined || name === '') {
//       name = await this._getNameOrDescription(locator, timeout);
//     }
//     await allure.step(`Click on [${name ?? 'element'}] field`, async () => {
//       try {
//         // wait for element to be displayed
//         await expect(locator).toBeVisible({
//           timeout: timeout ?? this.ELEMENT_DISPLAY_TIMEOUT,
//         });
//         await locator.click({
//           timeout: timeout ?? this.ELEMENT_DISPLAY_TIMEOUT,
//         });
//       } catch (error) {
//         logger.error(`Error clicking on element: ${name} with error details:\n\t${error['messag']}`);
//         // Capture and attach screenshot to Allure report
//         const screenshot = await this.takeScreenshot64(name);
//         await allure.attachment('Screenshot on failure', screenshot, this.IMAGE_TYPE);
//         throw error;
//       }
//     });
//   }

//   /**
//    * Enter text to textbox
//    *
//    * @param locator locator of textbox
//    * @param value value to enter
//    * @param name name of textbox
//    * @param timeout timeout for waiting default is 10s
//    */
//   public async enterText(
//     locator: Locator | UiElement,
//     value: string | undefined,
//     isPassword: boolean = false,
//     name?: string,
//     timeout?: number,
//   ): Promise<void> {
//     if (value === undefined) {
//       throw new Error('Value to enter is undefined, please check the input data');
//     }
//     if (locator instanceof UiElement) {
//       name ?? (name = locator.name ?? name);
//       locator = locator.locator;
//     }
//     logger.info(`Entering [${value}] to [${name ?? 'textbox'}] field`);
//     if (name === undefined || name === '') {
//       name = await this._getNameOrDescription(locator, timeout);
//     }
//     await allure.step(`Entering [${value}] to [${name ?? 'textbox'}] field`, async () => {
//       try {
//         // wait for element to be displayed
//         await expect(locator).toBeVisible({
//           timeout: timeout ?? this.ELEMENT_DISPLAY_TIMEOUT,
//         });
//         // fill value to element
//         await locator.fill(isPassword ? decode(value) : value, {
//           timeout: timeout ?? this.ELEMENT_DISPLAY_TIMEOUT,
//         });
//       } catch (error) {
//         logger.error(`Error entering [${value}] to element: ${name} with error details:\n\t${error.message}`);
//         // Capture and attach screenshot to Allure report
//         const screenshot = await this.takeScreenshot64(name);
//         await allure.attachment('Screenshot on failure', screenshot, this.IMAGE_TYPE);
//         throw error;
//       }
//     });
//   }

//   /**
//    * Get text of element
//    * @param locator element locator
//    * @param name name of locator
//    * @param timeout timeout for waiting default is 10s
//    */
//   public async getText(locator: Locator | UiElement, name?: string, timeout?: number): Promise<void> {
//     if (locator instanceof UiElement) {
//       name ?? (name = locator.name ?? name);
//       locator = locator.locator;
//     }
//     logger.info(`Getting value of [${name ?? ''}] field`);
//     if (name === undefined || name === '') {
//       name = await this._getNameOrDescription(locator, timeout);
//     }
//     await allure.step(`Get text of [${name ?? ''}] field`, async () => {
//       try {
//         // wait for element to be displayed
//         await expect(locator).toBeVisible({
//           timeout: timeout ?? this.ELEMENT_DISPLAY_TIMEOUT,
//         });
//         // fill value to element
//         await locator.textContent({
//           timeout: timeout ?? this.ELEMENT_DISPLAY_TIMEOUT,
//         });
//       } catch (error) {
//         logger.error(`Error getting value of element: ${name} with error details:\n\t${error.message}`);
//         // Capture and attach screenshot to Allure report
//         const screenshot = await this.takeScreenshot64(name);
//         await allure.attachment('Screenshot on failure', screenshot, this.IMAGE_TYPE);
//         throw error;
//       }
//     });
//   }

//   /**
//    * wait for element to be displayed in specific time
//    * throw error if element is not displayed
//    *
//    * @param locator element locator
//    * @param name name of locator
//    * @param timeout timeout for waiting default is 10s
//    */
//   public async waitForElementDisplayed(
//     locator: Locator | UiElement,
//     name: string,
//     isCaptured: boolean = false,
//     timeout?: number,
//   ): Promise<void> {
//     if (locator instanceof UiElement) {
//       locator = locator.locator;
//     }
//     await allure.step(
//       `Wait for [${name}] element to be displayed in ${timeout ?? this.ELEMENT_DISPLAY_TIMEOUT} milliseconds`,
//       async () => {
//         try {
//           await expect(locator).toBeVisible({ timeout: timeout ?? this.ELEMENT_DISPLAY_TIMEOUT })
//             .then(async () => {
//               if (isCaptured) {
//                 const screenshot = await this.takeScreenshot64(name, locator);
//                 await allure.attachment(name, screenshot, this.IMAGE_TYPE);
//               }
//             });
//         } catch (error) {
//           logger.error(
//             `Element [${name}] is not display after ${
//               timeout ?? this.ELEMENT_DISPLAY_TIMEOUT
//             } milliseconds with error details:\n\t${error.message}`,
//           );
//           // Capture and attach screenshot to Allure report
//           const screenshot = await this.takeScreenshot64(name);
//           await allure.attachment('Screenshot on failure', screenshot, this.IMAGE_TYPE);
//           throw error;
//         }
//       },
//     );
//   }

//   /**
//    * wait for element to be hidden in specific time
//    * throw error if element is still displayed
//    *
//    * @param locator element locator
//    * @param name name of locator
//    * @param timeout timeout for waiting default is 10s
//    */
//   public async waitForElementHidden(
//     locator: Locator | UiElement,
//     name: string,
//     isCaptured: boolean = false,
//     timeout?: number,
//   ): Promise<void> {
//     if (locator instanceof UiElement) {
//       name ?? (name = locator.name ?? name);
//       locator = locator.locator;
//     }
//     await allure.step(
//       `Wait for [${name}] element to be hidden in ${timeout ?? this.ELEMENT_DISPLAY_TIMEOUT} milliseconds`,
//       async () => {
//         try {
//           await expect(locator).toBeHidden({
//             timeout: timeout ?? this.ELEMENT_DISPLAY_TIMEOUT,
//           });
//           if (isCaptured) {
//             const screenshot = await this.takeScreenshot64(name);
//             await allure.attachment(name, screenshot, this.IMAGE_TYPE);
//           }
//         } catch (error) {
//           logger.error(
//             `Element [${name}] is still display after ${
//               timeout ?? this.ELEMENT_DISPLAY_TIMEOUT
//             } milliseconds with error details:\n\t${error.message}`,
//           );
//           // Capture and attach screenshot to Allure report
//           const screenshot = await this.takeScreenshot64(name, undefined, true);
//           await allure.attachment('Screenshot on failure', screenshot, this.IMAGE_TYPE);
//           throw error;
//         }
//       },
//     );
//   }

//   /**
//    * Checking if element is displayed or not
//    *
//    * @param locator locator of element
//    * @param name name of locator
//    * @param timeout timeout for waiting default is 10s
//    * @returns true if element is displayed, false if element is not displayed
//    */
//   async isElementDisplayed(locator: Locator | UiElement, name?: string, timeout?: number): Promise<boolean> {
//     if (locator instanceof UiElement) {
//       name ?? (name = locator.name ?? name);
//       locator = locator.locator;
//     }
//     logger.info(`Checking if [${name ?? 'element'}] is displayed or not`);
//     return await expect(locator)
//       .toBeVisible({
//         timeout: timeout ?? this.ELEMENT_DISPLAY_TIMEOUT,
//       })
//       .then(() => {
//         logger.info(`\tElement [${name ?? 'element'}] is displayed`);
//         return true;
//       })
//       .catch(() => {
//         logger.info(`\tElement [${name ?? 'element'}] is NOT displayed`);
//         return false;
//       });
//   }

//   /**
//    * Switch to tab by index
//    * @param tabIndex index of tab to switch
//    */
//   public async switchTab(tabIndex: number): Promise<void> {
//     const pages = this.page.context().pages();
//     await pages[tabIndex].bringToFront();
//   }

//   /**
//    * take the screenshot and return the path
//    * @param name name of screenshot
//    * @param locator if locator is provided then take screenshot of locator
//    * @returns full path of screenshot
//    */
//   public async takeScreenshot(
//     name?: string | undefined,
//     locator?: Locator | UiElement,
//     fullPage: boolean = false,
//   ): Promise<string> {
//     const screenshotDir = await this._getScreenshotDir();

//     if (!existsSync(screenshotDir)) {
//       mkdirSync(screenshotDir, { recursive: true });
//     }
//     const fullPath = path.join(screenshotDir, name ?? moment().format('yyyyMMMddhhmmss')) + '.png';
//     logger.info(`Taking screenshot: ${fullPath}`);
//     if (locator) {
//       locator = locator instanceof UiElement ? locator.locator : locator;
//       await locator
//         .screenshot({
//           path: fullPath,
//           timeout: 10000,
//           type: 'png',
//         })
//         .catch(async error => {
//           logger.error(`An error occured when trying to capture the locator.\n${error}`);
//           await this.page.screenshot({
//             fullPage: fullPage,
//             path: fullPath,
//             type: 'png',
//           });
//         });
//     } else {
//       await this.page.screenshot({
//         path: fullPath,
//       });
//     }
//     return fullPath;
//   }

//   /**
//    * Take a screenshot and return the Base64 encoded string.
//    * @param name Name of the screenshot (optional)
//    * @param locator Element locator for a specific area screenshot (optional)
//    * @param fullPage Take a screenshot of the full page (optional)
//    * @returns Base64 encoded string of the screenshot
//    */
//   public async takeScreenshot64(
//     name?: string | undefined,
//     locator?: Locator | UiElement,
//     fullPage: boolean = false,
//   ): Promise<Buffer> {
//     const filePath = await this.takeScreenshot(name, locator, fullPage);
//     return await promises.readFile(filePath); // Read image data as a buffer
//   }

//   /**
//    * get the parents path of screenshot by ENV variable
//    * @returns full parents path of screenshot directory
//    */
//   private async _getScreenshotDir(): Promise<string> {
//     const screenshotDir = getEnv.SCREENSHOT_DIR;
//     if (!screenshotDir) {
//       throw new Error('Missing environment variable: SCREENSHOT_DIR');
//     }

//     const testTitle = await test.info().title.replace(/\W+/g, '-'); // Sanitize test title for path
//     return path.join(screenshotDir, testTitle);
//   }

//   /**
//    * Attempt to get name or description of element by checking multiple attributes
//    * [name, placeholder, altText, textContent]
//    * If no attribute is found, return empty string
//    *
//    * @param locator element locator
//    * @returns name of element
//    */
//   private async _getNameOrDescription(locator: Locator, timeout?: number): Promise<string | undefined> {
//     let name: string | PromiseLike<string | undefined> | undefined;
//     try {
//       // await expect(locator).toBeVisible({
//       //   timeout: timeout ?? this.ELEMENT_DISPLAY_TIMEOUT,
//       // });
//       name = (await locator.innerText({ timeout: timeout ?? 100 })) ?? '';
//       if (name === '') {
//         name = (await locator.getAttribute('name', { timeout: timeout ?? 100 })) ?? '';
//       }
//       if (name?.trim() === '') {
//         name =
//           (await locator.getAttribute('placeholder', {
//             timeout: timeout ?? 100,
//           })) ?? '';
//       }
//       if (name?.trim() === '') {
//         name =
//           (await locator.getAttribute('altText', {
//             timeout: timeout ?? 100,
//           })) ?? '';
//       }
//       if (name.trim() === '') {
//         name = (await locator.textContent({ timeout: timeout ?? 100 })) ?? '';
//       }
//     } catch (error) {
//       logger.debug(`Unable to retreving name of element with error:\n${error.message}`);
//       return undefined;
//     }
//     return name;
//   }
// }
