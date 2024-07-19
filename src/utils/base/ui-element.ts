/**
 * ui-element.ts: This module provides utility functions for handling and manipulating locators in Playwright.
 * These utilities make it easier to interact with elements on the page, providing a layer of abstraction over Playwright's built-in locator methods.
 */

import { Frame, FrameLocator, Locator, selectors } from '@playwright/test';
import { getPage } from './page-utils';
import {
  FrameOptions,
  GetByPlaceholderOptions,
  GetByRoleOptions,
  GetByRoleTypes,
  GetByTextOptions,
  LocatorOptions,
} from '../types/optional-parameter-types';
import { defaultVisibleOnlyOption } from '@utils/constants/load-state';

/**
 * 1. Locators: This section contains functions and definitions related to locators.
 * Locators are used to find and interact with elements on the page.
 */

/**
 * Returns a Locator object based on the input provided.
 * @param {string | Locator} input - The input to create the Locator from.
 * @param {LocatorOptions} options - Optional parameters for the Locator.
 * @returns {Locator} - The created Locator object.
 */
export function getLocator(input: string | Locator, options?: LocatorOptions): Locator {
  const locator = typeof input === 'string' ? getPage().locator(input, options) : input;
  return options?.onlyVisible ? locator.locator('visible=true') : locator;
}

/**
 * Returns a locator pointing to only visible element based on the input provided.
 * By default, it returns locators that are visible. This behavior can be customized
 * via the `options` parameter, allowing for more specific locator configurations.
 *
 * @param input - The selector string or Locator object to identify the element.
 * @param options - Optional. Configuration options for the locator. Use `{ onlyVisible: false }`
 * to include non-visible elements in the locator's search criteria.
 * @returns A `Locator` instance pointing to an element that matches the specified
 * criteria, prioritizing visibility unless overridden by `options`.
 */
export function getVisibleLocator(input: string | Locator, options?: LocatorOptions): Locator {
  return getLocator(input, { ...defaultVisibleOnlyOption, ...options });
}

/**
 * Returns a Locator object with a specific testId. The global testId attribute is set in the playwright.config.ts file with default value as 'data-testid' if not set explicitly, but can be overridden by providing an attributeName.
 * @param {string | RegExp} testId - The testId to create the Locator from.
 * @param {string} [attributeName] - Optional attribute name for the testId. If provided, this will override the default 'testId' attribute value set in the playwright.config.ts file only for this instance.
 * @returns {Locator} - The created Locator object.
 */
export function getById(testId: string | RegExp, attributeName?: string): Locator {
  if (attributeName) {
    selectors.setTestIdAttribute(attributeName);
  }
  return getPage().getByTestId(testId);
}

/**
 * Returns a Locator object with a specific text.
 * @param {string | RegExp} text - The text to create the Locator from.
 * @param {GetByTextOptions} options - Optional parameters for the Locator.
 * @returns {Locator} - The created Locator object.
 */
export function getLocatorByText(text: string | RegExp, options?: GetByTextOptions): Locator {
  return getPage().getByText(text, options);
}

/**
 * Returns a Locator object with a specific role.
 * @param {GetByRoleTypes} role - The role to create the Locator from.
 * @param {GetByRoleOptions} options - Optional parameters for the Locator.
 * @returns {Locator} - The created Locator object.
 */
export function getLocatorByRole(role: GetByRoleTypes, options?: GetByRoleOptions): Locator {
  return getPage().getByRole(role, options);
}

/**
 * Returns a Locator object with a specific label.
 * @param {string | RegExp} text - The label text to create the Locator from.
 * @param {GetByRoleOptions} options - Optional parameters for the Locator.
 * @returns {Locator} - The created Locator object.
 */
export function getLocatorByLabel(text: string | RegExp, options?: GetByRoleOptions): Locator {
  return getPage().getByLabel(text, options);
}

/**
 * Returns a Locator object with a specific placeholder.
 * @param {string | RegExp} text - The place holder text to create the Locator from.
 * @param {GetByPlaceholderOptions} options - Optional parameters for the Locator.
 * @returns {Locator} - The created Locator object.
 */
export function getLocatorByPlaceholder(text: string | RegExp, options?: GetByPlaceholderOptions): Locator {
  return getPage().getByPlaceholder(text, options);
}

/**
 * Returns all Locator objects based on the input provided.
 * @param {string | Locator} input - The input to create the Locators from.
 * @param {LocatorOptions} options - Optional parameters for the Locators.
 * @returns {Promise<Locator[]>} - The created Locator objects.
 */
export async function getAllLocators(input: string | Locator, options?: LocatorOptions): Promise<Locator[]> {
  return typeof input === 'string' ? await getPage().locator(input, options).all() : await input.all();
}

/**
 * 2. Frames: This section contains functions and definitions related to frames.
 * Frames are used to handle and interact with iframes or frames within the web page.
 */

/**
 * Returns a Frame object based on the provided frame selector options. If the frame is not found, an error is thrown unless the 'force' option is set to true.
 * @param {FrameOptions} frameSelector - The options to identify the frame.
 * @param {{ force?: boolean }} options - Additional options for frame retrieval.
 * - force (boolean): If true, returns the frame (or null) without throwing an error if the frame is not found.
 * @returns {null | Frame} - The Frame object if found, otherwise null (if 'force' is true).
 * @throws {Error} - Throws an error if the frame is not found and 'force' is false.
 */
export function getFrame(frameSelector: FrameOptions, options = { force: false }): null | Frame {
  const frame = getPage().frame(frameSelector);
  if (options.force) return frame;
  if (!frame) {
    throw new Error(`Frame not found with selector: ${JSON.stringify(frameSelector)}`);
  }
  return frame;
}

/**
 * Returns a FrameLocator object based on the input provided.
 * @param {string | FrameLocator} frameInput - The input to create the FrameLocator from.
 * @returns {FrameLocator} - The created FrameLocator object.
 */
export function getFrameLocator(frameInput: string | FrameLocator): FrameLocator {
  return typeof frameInput === 'string' ? getPage().frameLocator(frameInput) : frameInput;
}

/**
 * Returns a Locator object within a specific frame based on the input provided.
 * @param {string | FrameLocator} frameInput - The input to create the FrameLocator from.
 * @param {string | Locator} input - The input to create the Locator from, within the frame.
 * @returns {Locator} - The created Locator object.
 */
export function getLocatorInFrame(frameInput: string | FrameLocator, input: string | Locator): Locator {
  return getFrameLocator(frameInput).locator(input);
}
