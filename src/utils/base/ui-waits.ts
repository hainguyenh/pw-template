/**
 * ui-wait.ts: This module provides utility functions for retrieving text from web elements in web page and conditional statements with in Playwright.
 * These utilities include a variety of functions for retrieving text, input values, URLs, and checking conditions such as
 * whether an element is visible or checked. It provides a layer of abstraction over Playwright's built-in methods for
 * interacting with elements, making it easier to perform common tasks and checks on web elements.
 */

import { Locator } from '@playwright/test';
import { TimeoutOption } from '../types/optional-parameter-types';
import { wait } from '@page-utils';
import { logger } from '@custom-log';
import { test } from '@playwright/test';
import { getLocator } from '@ui-element';
import { SMALL_TIMEOUT } from '@timeouts';
import { allure } from 'allure-playwright';
import { takeScreenshot64 } from '@utils/take-screenshot';
import { IMAGE_PNG } from '@utils/constants';

/**
 * 1. Conditions: Use these checks within conditional statements.
 * They are not intended for use in assertions, unless the built-in Playwright assertions do not meet your criteria.
 */

/**
 * Checks if a Locator object is attached to DOM.
 * @param {string | Locator} input - The input to create the Locator from.
 * @param {TimeoutOption} [options] - Optional timeout options.
 * @returns {Promise<boolean>} - True if the Locator is attached, false otherwise.
 */
export async function isElementExisted(input: string | Locator, options?: TimeoutOption): Promise<boolean> {
  const locator = getLocator(input); // Assuming getLocator returns a Playwright Locator
  const timeoutInMs = options?.timeout || SMALL_TIMEOUT;

  try {
    await locator.waitFor({ state: 'attached', timeout: timeoutInMs });
    return true;
  } catch (error) {
    console.log(`isElementAttached- ${error instanceof Error ? error.message : String(error)}`);
    return false;
  }
}

/**
 * Checks if a Locator object is attached to DOM and is visible.
 * @param {string | Locator} input - The input to create the Locator from.
 * @param {TimeoutOption} [options] - Optional timeout options.
 * @returns {Promise<boolean>} - True if the Locator is visible, false otherwise.
 */
export async function isElementVisible(input: string | Locator, options?: TimeoutOption): Promise<boolean> {
  const locator = getLocator(input);
  const timeoutInMs = options?.timeout || SMALL_TIMEOUT;
  const startTime = Date.now();
  try {
    while (Date.now() - startTime < timeoutInMs) {
      if (await locator.isVisible(options)) {
        return true;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  } catch (error) {
    console.log(`isElementVisible- ${error instanceof Error ? error.message : String(error)}`);
  }
  return false;
}

/**
 * Checks if a Locator object is hidden or not present in DOM.
 * @param {string | Locator} input - The input to create the Locator from.
 * @param {TimeoutOption} [options] - Optional timeout options.
 * @returns {Promise<boolean>} - True if the Locator is hidden, false otherwise.
 */
export async function isElementHidden(input: string | Locator, options?: TimeoutOption): Promise<boolean> {
  const locator = getLocator(input);
  const timeoutInMs = options?.timeout || SMALL_TIMEOUT;
  const startTime = Date.now();
  try {
    while (Date.now() - startTime < timeoutInMs) {
      if (await locator.isHidden(options)) {
        return true;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  } catch (error) {
    console.log(`isElementHidden- ${error instanceof Error ? error.message : String(error)}`);
  }
  return false;
}

/**
 * Checks if a Locator object is checked.
 * @param {string | Locator} input - The input to create the Locator from.
 * @param {TimeoutOption} [options] - Optional timeout options.
 * @returns {Promise<boolean>} - True if the Locator is checked, false otherwise.
 */
export async function isElementChecked(input: string | Locator, options?: TimeoutOption): Promise<boolean> {
  try {
    if (await isElementVisible(input, options)) {
      return await getLocator(input).isChecked(options);
    }
  } catch (error) {
    console.log(`isElementChecked- ${error instanceof Error ? error.message : String(error)}`);
  }
  return false;
}

/**
 * Waits for an element to be stable on the page.
 * @param input - The element or locator to wait for.
 * @param options - Optional timeout options.
 * @returns A promise that resolves to a boolean indicating if the element is stable.
 */
export async function isElementStability(input: string | Locator, options?: TimeoutOption): Promise<boolean> {
  let result = false;
  await test.step('waitForElementToBeStable', async () => {
    const locator = getLocator(input);
    const maxWaitTime = options?.timeout || SMALL_TIMEOUT;
    let stableCounter = 0;

    const initialBoundingBox = await locator.boundingBox();
    let lastX: number | null = initialBoundingBox?.x || null;
    let lastY: number | null = initialBoundingBox?.y || null;

    const startTime = Date.now();
    await wait(200);

    while (Date.now() - startTime < maxWaitTime) {
      const { x, y } = (await locator.boundingBox()) || { x: null, y: null };

      if (x === lastX && y === lastY) {
        stableCounter++;
        if (stableCounter >= 3) {
          result = true;
          break;
        }
        await wait(100);
      } else {
        // stableCounter = 0;
        await wait(200);
      }

      lastX = x;
      lastY = y;
    }

    if (!result) {
      logger.error('Max wait time exceeded. Element is not stable.');
    }
  });
  return result;
}

/**
 * Waits for an element to be visible on the page.
 * @param input - The element or locator to wait for.
 * @param options - Optional timeout options.
 * @returns A promise that resolves when the element is visible.
 */
export async function waitForElementToBeVisible(input: string | Locator, options?: TimeoutOption): Promise<void> {
  await allure.step(`Wait for the element to be visible`, async () => {
    try {
      const locator = getLocator(input);
      await locator.waitFor({ state: 'visible', timeout: options?.timeout || SMALL_TIMEOUT });
    } catch (error) {
      logger.error(`waitForElementToBeVisible- ${error instanceof Error ? error.message : String(error)}`);
      const screenshot = await takeScreenshot64();
      await allure.attachment('Screenshot on failure', screenshot, IMAGE_PNG);
    }
  });
}

/**
 * Waits for an element to be hidden on the page or detached from the DOM.
 * @param input - The element or locator to wait for.
 * @param options - Optional timeout options.
 * @returns A promise that resolves when the element is hidden.
 */
export async function waitForElementToBeHidden(input: string | Locator, options?: TimeoutOption): Promise<void> {
  const locator = getLocator(input);
  await locator.waitFor({ state: 'hidden', timeout: options?.timeout || SMALL_TIMEOUT });
}

/**
 * Waits for an element to be attached to the DOM.
 * @param input - The element or locator to wait for.
 * @param options - Optional timeout options.
 * @returns A promise that resolves when the element is attached to the DOM.
 */
export async function waitForElementToBeExisted(input: string | Locator, options?: TimeoutOption): Promise<void> {
  const locator = getLocator(input);
  await locator.waitFor({ state: 'attached', timeout: options?.timeout || SMALL_TIMEOUT });
}

/**
 * Waits for an element to be detached from the DOM.
 * @param input - The element or locator to wait for.
 * @param options - Optional timeout options.
 * @returns A promise that resolves when the element is detached from the DOM.
 */
export async function waitForElementToBeNotExist(input: string | Locator, options?: TimeoutOption): Promise<void> {
  const locator = getLocator(input);
  await locator.waitFor({ state: 'detached', timeout: options?.timeout || SMALL_TIMEOUT });
}
