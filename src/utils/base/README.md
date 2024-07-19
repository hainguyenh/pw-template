## 🔥

This directory is dedicated to housing utility functions that streamline test development and enhance code reusability.
The utilities encompass various functionalities like handling frames, managing alerts, asserting elements, and more.
These utilities are designed to simplify test scripts and ensure consistency
across tests.

---

## Table of Contents

- [**Utilities**](#utilities)
  - [Page Utilities](#page-utils)
  - [Locator Utilities](#ui-element)
  - [Handling Frames](#handling-frames)
  - [Action Utilities](#ui-actions)
  - [Locator Visibility Setting](#locator-visibility-setting)
  - [Overriding Default Visibility Setting](#overriding-default-visibility-setting)
  - [Managing Alerts](#managing-alerts)
  - [Element Utilities](#ui-waits)
  - [Assert Utilities](#verify-helper)
  - [Hard Assertions](#hard-assertions)
  - [Soft Assertions](#soft-assertions)
  - [Optional Parameter Type Objects](#optional-parameter-type-objects)
  - [Importing Utility Functions](#importing-utility-functions)
  - [Test annotations](#test-annotations)

## Utilities

The framework offers a collection of utility functions that streamline the identification of elements, common actions,
and assertions in Playwright. These functions are located in
the `src/utils` directory and include:

- [page-utils.ts](#page-utils): This file contains page functions like setting a page, getting a page, switching
  between the pages, closing and re-loading a page, loading and getting the page url, getting windows size, page
  navigations etc.

- [ui-element.ts](#ui-element): This file has functions that helps in finding web elements on pages and frames
  in various ways, such as by test ID, label, text, CSS, or XPath.

- [ui-actions.ts](#ui-actions): This file contains functions to perform several common actions like clicking,
  filling input fields, selecting options from dropdowns, drag and drop, handling alerts, scroll, uploading and
  downloading files, navigating and reloading pages.

- [ui-waits.ts](#ui-waits): This file contains functions for handling conditional statements with web
  elements, such as checking if an element is visible, hidden, or contains certain text or input values.

- [verify-helper.ts](#verify-helper): This file contains functions for adding both soft and hard assertions in your
  tests. Soft assertions do not stop the test when they fail, while hard assertions do.

These utilities are designed to make your tests more readable and maintainable while minimizing the need for repetitive
boilerplate code. And these utilities can be imported into Page objects using two different methods, as explained in the
following [section](#importing-utility-functions).

Here are a few examples of how to use the utility functions:

### Page Utils

The `page-utils` module contains the functions of the Page. These functions are used for managing Page objects and
centralizes the management of Page objects, making it easier to control the state of your tests.

```typescript
import { gotoURL, switchPage, switchToDefaultPage, closePage, reloadPage, wait } from '@page-utils';

// Navigate to a URL
await gotoURL('https://www.example.com', { timeout: MAX_TIMEOUT });

// Switch to the second tab/window
await switchPage(2);

// Switch to the initial page that was launched or the first tab/window.
await switchToDefaultPage();

// reloads the current page
await reloadPage();

// Close the current page and then switch to the default page if it exists.
await closePage();

// Static wait, to use as a temporary workaround for intermittent issues related to elements loading or transitioning states in test automation
await wait(SMALL_TIMEOUT);
```

1. `gotoURL(path: string, options: GotoOptions)`: This function navigates to a specific URL. The path parameter is the
   URL you want to navigate to, and the options parameter is an optional parameter that specifies additional navigation
   options. Here we have overridden the default navigation timeout with MAX_TIMEOUT optional parameter.

2. `switchPage(winNum: number, options?: SwitchPageOptions)`: This function switches page to the given window index. The
   winNum parameter is the index of the window that you want to switch to, and the options parameter is an optional
   parameter that specifies additional switch page options.

   Useful when a test involves interacting with multiple pages.

3. `switchToDefaultPage()`: This function switches to the initial page that was launched or the first tab/window.

   Useful when you want to return to the starting context after interacting with other pages.

4. `reloadPage(options?: NavigationOptions)`: This function loads the current page. The options parameter is an optional
   parameter that specifies additional navigation options.

5. `closePage(winNum?: number)`: This function is used to close a page or window and switches to the default page if it
   exists. If you provide the optional 'winNum' parameter, which is an index number for the window, it will close the
   window of that index. If you don't specify any index, it will just close the current page or window you are on.

   Useful for cleaning up after a test that opens additional pages.

6. `wait(ms: number)`: This function defines the period of time in milliseconds during which a script pauses or sleeps
   before proceeding to the next step or action. `SMALL_TIMEOUT` is a constant defined for 5000 milliseconds,
   under `constants` directory in `vasu-playwright-utils` package.

### Ui Element

The `ui-element` module provides a set of utility functions that identify locators in various ways in Playwright.
Locators are used to identify elements on a webpage and are crucial for interacting with web elements in order to
perform actions such as clicking a button or inputting text into a form field.

Here's an example on how to use various locator functions from `ui-element`:

```typescript
import {
  getLocator,
  getLocatorByTestId,
  getLocatorByText,
  getLocatorByRole,
  getLocatorByLabel,
} from '@ui-element';

// Locator with CSS
const cssLocator = `button#submit`;

// Locator with Xpath
const xpathLocator = `button[@id='submit']`;

// Locator with testIdAttribute
const testIdLocator = () => getLocatorByTestId('submit-button');

// Locator by text
const textLocator = () => getLocatorByText('Submit');

// Locator by role
const roleLocator = () => getLocatorByRole('button', { name: 'Login' });
const chainingRoleLocator = () => getLocator(`//form[@name='create-account']`).getByRole('button', { name: 'Sign Up' });

// Locator by label
const labelLocator = () => getLocatorByLabel('Submit Button');

// Locator with 'and' operator
const locatorWithAnd = () => getLocator(`button#submit`).and.(getLocator(`button#Enabled`));

// Locator with 'or' operator
const locatorWithOr = () => getLocator(`button[@id='gridview']`).or.(getLocator(`button[@id='listview']`);

// Locator with filter
const locatorWithFilter = () => getLocatorByRole('button').filter({ hasText: 'submit' });
const rememberMeCheckbox = () => getLocator(`label`).filter({
  has: getLocator(`//input[@type='checkbox']`),
  hasText: 'Remember me'
}).locator(`span`).first();
```

In this example, we're using various functions from `ui-element`:

1. `getLocator(selector: string)`: This function returns a Locator object for the given Xpath or CSS selector. The
   selector parameter is a string representing the Xpath or CSS selector of the element you want to locate.

2. `getLocatorByTestId(testId: string)`: This function returns a Locator object for the element with the given test ID.
   The `testId` parameter is a string representing the `testIdAttribute` of the element you want to locate. The default
   TestID is a `data-testid` attribute that can be added to any web element on the HTML page. The `testIdAttribute`
   attribute can be configured in the `playwright.config.ts` file.

   For example, if you have the following configuration in your `playwright.config.ts` file:

   ```typescript
   testIdAttribute: 'qa-target';
   ```

   With this configuration, you can directly pass the `qa-target` value to the `getLocatorByTestId` function without the
   need for any CSS or XPath. This simplifies the process of locating elements on the page, especially when dealing with
   complex or dynamic content. For more information please refer
   to [Playwright test id documentation](https://playwright.dev/docs/locators#locate-by-test-id)

3. `getLocatorByText(text: string)`: This function returns a Locator object for the element with the given text. The
   text parameter is a string representing the text of the element you want to locate.

4. `getLocatorByRole(role: string)`: This function returns a Locator object for the element with the given ARIA role.
   The role parameter is a string representing the ARIA role of the element you want to locate.

5. `getLocatorByLabel(label: string)`: This function returns a Locator object for the element with the given label. The
   label parameter is a string representing the label of the element you want to locate.

6. These locator functions can also be easily used with Locator operators( `and`, `or`) and filters(`filter`). For more
   information on Locator operators and filters, please refer
   to [Playwright Locator documentation](https://playwright.dev/docs/locators#filtering-locators)

Here is some more information about `ui-element` usage as this is a unique POM design pattern:

- We use a closure to declare the Locator because the page object is initialized during runtime. If we call the function
  directly, it may return null due to the page object not being initialized yet. By using a closure, we ensure that
  we're accessing the page object only after it has been properly initialized.

- For XPath or CSS selectors, we can directly use a string instead of a closure, as these selectors do not involve the
  page object. This approach allows us to define selectors in a straightforward manner without worrying about the page
  object's initialization state.

- We are calling the locator function instead of using a constant locator as the page object is initialized during
  runtime only.

`ui-element` functions can be used with various `Locator options`, optional parameter type objects. Please refer to
the [Optional Parameter Type Objects](#optional-parameter-type-objects) section below for more information.

#### Handling Frames

The `ui-element` module also provides utility functions to handle frames in Playwright. Frames are used in web
development to divide the content of a page into multiple, scrollable regions. With Playwright, you can interact with
frames in a similar way as you do with separate pages.

Here's how you can use the `ui-element` functions to handle frames easily:

```typescript
import { getFrameLocator, getLocatorInFrame, getFrame } from '@ui-element';

// CSS/Xpath Selector for the iframe
const frameSelector = `iframe[name='test-frame']`;

// Get a FrameLocator using CSS/Xpath and use it to identify multiple locators inside this frame
export const webFrameLocator = () => getFrameLocator(frameSelector);

// Theses locators are inside above frame. We are just identifying the locators in the page but not inside the above frame yet
const signupLocator = () => getLocatorByTestId('sign-up');
const cancelLocator = () => getLocator(`button[name='cancel']`);

// Different ways to identify a locator inside above frame

// Method 1: Identify a locator within a frame by using locator methods with frameLocator.
// This is the preferred method for better readability.
const locatorInFrame1 = () => webFrameLocator().getByTestId('continue-button');
const cancelButton1 = () => webFrameLocator().locator(`button[name='cancel']`);

// Method 2: Identify a locator within a frame using a CSS/XPath frameSelector and an element locator.
const locatorInFrame2 = () => getLocatorInFrame(frameSelector, signupLocator());
const cancelButton2 = () => getLocatorInFrame(frameSelector, cancelLocator());

// Method 3: Identify a locator within a frame using frameLocator and an element locator.
const locatorInFrame3 = () => getLocatorInFrame(webFrameLocator(), signupLocator());
const cancelButton3 = () => getLocatorInFrame(webFrameLocator(), cancelLocator());

// Identify the frame using frame name to interact with elements within it or to evaluate JavaScript inside the frame
const webFrame = () => getFrame('WebApplicationFrame');
//Assertion to check if frame is present
expect(webFrame(), 'Frame webFrame should exist').not.toBeNull();

// Identify a Nested frame, i.e frame inside webFrame
const nestedFrame = webFrame()
  .childFrames()
  .find(frame => frame.url().startsWith(<HOST_URL>));
// Assertion to check if nestedFrame is defined
expect(nestedFrame, 'Frame nestedFrame should exist').toBeDefined();
await nestedFrame?.evaluate(<syncFunc>, <data>);
```

In this example, we're using various functions from `ui-element` to handle frames:

1. `getFrameLocator(frameInput: string | FrameLocator)`: This function returns a FrameLocator object that we can use to
   enter the iframe and select locators in that iframe. The selector parameter is a string representing the Xpath or CSS
   selector of the frame you want to locate.

2. `getLocatorInFrame(frameInput: string | FrameLocator, input: string | Locator)`: This function returns a Locator
   object inside the frame. The frameInput parameter is a string representing the frame Xpath or CSS selector that you
   want to locate and the input parameter is a string or Locator of the element you want to locate inside the frame.

3. `getFrame(frameSelector: FrameOptions)`: This function returns a Frame/null object. The frameSelector parameter is a
   string representing the name or id attribute of the frame or url attribute of frame as an object.

These Locator functions make it easier to locate elements on the page, and they provide a more readable and maintainable
way to define locators in your tests.

For more information, please refer
to [Playwright FrameLocator documentation](https://playwright.dev/docs/api/class-framelocator)
and [Playwright Frame documentation](https://playwright.dev/docs/api/class-frame).

### Ui Actions

The `ui-actions` module provides a set of utility functions that simplify common actions in Playwright. These
functions are designed to make your tests more readable, maintainable and reduce the amount of boilerplate code you need
to write.

Here's an example of how to use the `ui-actions` functions:

```typescript
import { click, fill, pressSequentially, check, uploadFiles, selectByValue } from '@ui-actions';
import { getText, getAllTexts, getInputValue, getAttribute, attribute } from '@ui-actions';
import { SMALL_TIMEOUT, MAX_TIMEOUT } from '@timeout';

// Click an element
await click(`text='Log in'`);

// Fill a form field
await fill(`input#username`, 'myusername');

// Press sequentially into a form field
await pressSequentially(`input#search`, 'searchText');

// Check a checkbox or radio button
await check(`input#agree`);

// Upload files
await uploadFiles(`input#file`, '/path/to/myfile.jpg');

// Select a value from a dropdown
await selectByValue(`#dropdown`, 'selectValue');

// getting inner text
const text = await getText(textLocator());

// getting all inner texts
const allTexts = await getAllTexts(textLocator());

// getting input value
const inputValue = await getInputValue(userName());

// getting 'class' attribute value
const attribute = await getAttribute(labelLocator(), 'class');
```

In this example, we're using various functions from `ui-actions`:

1. `click(input: string | Locator, options?: ClickOptions)`: This function clicks an element on the page. The input
   parameter is a string or Locator representing the element you want to click, and the options parameter is an optional
   parameter that specifies additional click options.

2. `fill(input: string | Locator, value: string, options?: FillOptions)`: This function fills a form field with a
   specific value. The input parameter is a string or Locator representing the form field you want to fill, the value
   parameter is the value you want to fill the form field with, and the options parameter is an optional parameter that
   specifies additional fill options.

3. `pressSequentially(input: string | Locator, value: string, options?: PressSequentiallyOptions)`: This function enters
   text into a field character by character, as if it was a user with a real keyboard. The input parameter is a string
   or Locator representing the form field you want to enter the text, the value parameter is the value you want to enter
   the form field with, and the options parameter is an optional parameter that specifies additional PressSequentially
   options.

   Typically, `fill` is a more versatile and efficient choice that works effectively in most scenarios. It not only
   clears the input field but also simulates a single input event, similar to paste.

   Unlike `fill` action, `pressSequentially` does not clear the input field's content; instead, it appends the specified
   text to the existing content. This method simulates keyboard key presses like keydown, keypress/input, and keyup, for
   each character in the provided text.

   To find more information on `fill` vs `pressSequentially`, please refer
   to [Playwright Type characters documentation](https://playwright.dev/docs/input#type-characters).

4. `check(input: string | Locator, options?: CheckOptions)`: This function checks a checkbox or radio button. The input
   parameter is a string or Locator representing the checkbox or radio button you want to check, and the options
   parameter is an optional parameter that specifies additional check options.

5. `uploadFiles(input: string | Locator, path: UploadValues, options?: UploadOptions)`: This function is used to upload
   files. The input parameter is a string or Locator representing the file input you want to upload files to, the path
   parameter is the path of the files you want to upload, and the options parameter is an optional parameter that
   specifies additional upload options.

6. `selectByValue(input: string | Locator, value: string, options?: SelectOptions)`: This function selects a value from
   a dropdown. The `input` parameter is a string or Locator representing the select element, the value parameter is
   the `value` to select for the dropdown option, and the `options` parameter specifies additional select options.

7. Similarly, we have `selectByText()` and `selectByIndex()` functions for selecting options by text or index,
   and `selectByValues()` for multi-select dropdowns.

For more information on actions, please refer to
the [Playwright Actions documentation](https://playwright.dev/docs/input). For more information on auto-waits, refer
to [Playwright Auto waiting documentation](https://playwright.dev/docs/actionability).

`ui-actions` functions can be used with various `Action options`, optional parameter type objects. Please refer to
the [Optional Parameter Type Objects](#optional-parameter-type-objects) section below for more information.

#### Locator Visibility Setting

#### Default setting

The majority of `ui-actions` functions are designed to act on visible locators by default. When multiple locators are
identified using a selector, the functions automatically filter out any locators that are hidden, focusing on the
visible locator to execute the action. However, if there are multiple visible locators, a `strict mode violation` error
will occur unless the selection is narrowed down to a single locator that is needed for performing the action.

Functions designed to operate on visible locators by default that include the `onlyVisible: true`
parameter : `click`, `clickAndNavigate`, `fill`, `fillAndEnter`, `pressSequentially`, `pressKeyboard`, `clear`, `selectByValue`, `selectByValues`, `selectByText`, `selectByIndex`, `hover`, `focus`, `dragAndDrop`, `doubleClick`, `downloadFile`, `uploadFiles`

Although actions are primarily performed on visible locators filtered from all identified locators, assertions are
performed on both visible and invisible locators. By default, the `verify-helper` functions do not include a visibility
setting filter set to `true`. To filter the locator passed to the `verify-helper` functions, add the optional type
parameter `onlyVisible: true` to the `ui-element` functions.

This approach ensures that the assertions apply only to visible elements, thereby filtering the hidden locators as
needed.

```typescript
const continueButton = () => getLocatorByTestId('continue', { onlyVisible: true });
await expectElementToBeVisible(continueButton());
```

#### Overriding Default Visibility Setting

#### Global override

We can globally change the default visibility setting for the provided `ui-actions` functions by setting the
visibility value to `false`. This can be achieved by adding the following function in the `playwright.config.ts` file (
just above the configuration settings).

```typescript
setDefaultLocatorFilterVisibility(false);
```

#### Local override

If you prefer not to globally override the visibility setting but instead want to customize it for a specific action,
you can achieve this by adding `onlyVisible: false` as an optional parameter to that individual action function.

This approach allows for selective overriding of the visibility condition on a per-action basis.

```typescript
await click(`#button`, { onlyVisible: false });
```

### Managing Alerts

The `ui-actions` module also provides utility functions to handle alerts in Playwright.

Here's an example of how to use the `ui-actions` functions to handle alerts:

```typescript
import { acceptAlert, dismissAlert, getAlertText } from '@ui-actions';

// Click on an element that opens an alert and then accept the alert
await acceptAlert(outOfStockButton());

// Click on an element that opens an alert and then dismiss the alert
await dismissAlert(outOfStockButton());

// Click on an element that opens an alert and then get the text from the alert
const text = await getAlertText(outOfStockButton());
```

In this example, we're using various functions from `ui-actions` to handle alerts:

1. `acceptAlert(input: string | Locator, promptText?: string)`: This function is used to accept an alert dialog.
   The `input` parameter is a string or Locator representing the element that triggers the alert, and the `promptText`
   parameter is an optional parameter that specifies the text to enter into a prompt dialog.

2. `dismissAlert(input: string | Locator)`: This function is used to dismiss an alert dialog. The `input` parameter is a
   string or Locator representing the element that triggers the alert.

3. `getAlertText(input: string | Locator)`: This function is used to get the text from an alert dialog. The `input`
   parameter is a string or Locator representing the element that triggers the alert.

These functions make it easier to handle alerts in your tests, and they provide a more readable and maintainable way to
define alert handling in your tests.
For more information, please refer
to [Playwright Alerts documentation](https://playwright.dev/docs/dialogs#alert-confirm-prompt-dialogs).

### Ui Waits

The `ui-element` module provides utility functions for extracting values from web elements and performing condition
checks. These functions are designed to handle common tasks related to web elements, such as retrieving text or
attribute values, checking visibility, and more.

```typescript
import { isElementVisible } from '@ui-waits';

// element visibility conditional check
if (isElementVisible(logoutButton())) {
  console.log('Login is successful');
} else {
  console.log('Login is not successful');
}
```

In this example, we're using various functions from `ui-element` to extract values and verify condition checks:

1. `getText(input: string | Locator, options?: TimeoutOption)`: This function gets the inner text of an element. The
   input parameter is a string or Locator representing the element from which to get the text. TimeoutOption is an
   optional parameter for timeout.

2. `getAllTexts(input: string | Locator)`: This function gets all inner texts from the given locator. TimeoutOption is
   an optional parameter for timeout.

3. `getInputValue(input: string | Locator, options?: TimeoutOption)`: This function gets the input value from text or
   form fields. The input parameter is a string or Locator representing the element from which to get the text.
   TimeoutOption is an optional parameter for timeout.

4. `getAttribute(input: string | Locator,attributeName: string, options?: TimeoutOption)`: This function gets the
   attribute value from the given attributeName parameter of the Locator. TimeoutOption is an optional parameter for
   timeout.

5. `isElementVisible(input: string | Locator, options?: TimeoutOption)`: This function checks whether the given input
   parameter is visible and returns a boolean value. TimeoutOption is an optional parameter for timeout.

### Verify Helper

The `verify-helper` module provides a set of utility functions that simplify common assertions in Playwright. These
functions are designed to make your tests more readable and maintainable. This module also support both `hard`and `soft`
assertions, allowing you to choose the appropriate level of strictness for your tests.

### Hard Assertions

Hard assertions terminates the test execution right away if the assertion fails, preventing further code execution.
They're crucial for conditions where it's not logical to continue the test if a certain check fails.

```typescript
import {
  expectElementToBeVisible,
  expectElementToBeHidden,
  expectElementToHaveText,
  expectElementNotToBeChecked,
  expectElementNotToContainText,
} from '@verify-helper';
import { INSTANT_TIMEOUT, STANDARD_TIMEOUT } from '@timeout';

// asserting element to be visible
await expectElementToBeVisible(logoutButton(), 'Login should be successful', { timeout: STANDARD_TIMEOUT });

// asserting element to be invisible
await expectElementToBeHidden(signInButton(), 'signInButton should not be displayed');

// asserting element to have the text
await expectElementToHaveText(successfulMessage(), 'You have logged in successfully', {
  ignoreCase: true,
  message: 'Verify Login should be Successful',
});

// asserting check box is not checked
await expectElementNotToBeChecked(agreeCheckbox(), { timeout: INSTANT_TIMEOUT });
```

In this example, we're using various functions from `verify-helper`:

1. `expectElementToBeVisible(input: string | Locator, options?: ExpectOptions)`: This function checks if a specific
   element is visible on the page. The input parameter is a string or Locator representing the element you want to
   check. The options parameter is an optional parameter that specifies additional options like timeout and a custom
   message to display in the report if the assertion fails.

2. `expectElementToBeHidden(element: Locator, message?: string, options?: ExpectOptions)`: This function checks if a
   specific element is hidden on the page. The parameters are the same as expectElementToBeVisible.

3. `expectElementToHaveText(input: string | Locator, text: string | RegExp | Array<string | RegExp>, options?: ExpectOptions & ExpectTextOption)`:
   This function asserts that the text of a specific element matches the expected text. The input parameter is a string
   or Locator representing the element from where we assert text, the text parameter is the value you want to assert
   with, and the ExpectOptions and ExpectTextOption parameters are optional parameters that specify additional assert
   options like soft assertion, ignore case, etc.

4. `expectElementNotToContainText(element: Locator, unexpectedText: string, options?: ExpectOptions)`: This function
   checks if a specific element does not contain a certain text. The unexpectedText parameter is the text you expect the
   element not to contain.

These functions make it easier to write assertions in your tests, and they provide better error messages when the
assertions fail.

### Soft Assertions

Unlike hard assertions, soft assertions do not stop the test execution when they fail. The test continues to run,
allowing multiple assertions to be checked and their failures to be collected. At the end of the test, all the failures
are reported together. Although the test continues, the failure of a soft assertion will still mark the test as failed
at its conclusion.

```typescript
import { expectElementToBeVisible, expectElementNotToContainText } from '@verify-helper';
import { INSTANT_TIMEOUT, STANDARD_TIMEOUT } from '@timeout';

// with 'soft' optional parameter 'true' we are making these assertions as soft assertion
await expectElementToBeVisible(logoutButton(), 'Login should be successful', { timeout: STANDARD_TIMEOUT, soft: true });

await expectElementNotToBeChecked(agreeCheckbox(), { timeout: INSTANT_TIMEOUT, soft: true });

await expectElementNotToContainText(successfulMessage(), '404 error', { soft: true });

//Use this step in spec file to immediately stop and fail the test at that point itself when any soft assertion fails, instead of failing at the end of the test
assertAllSoftAssertions(test.info());
```

1. `soft: boolean` soft parameter is a SoftOption parameter. with `soft` optional parameter `true` we are making this
   assertion as soft assertion.

2. `assertAllSoftAssertions(testInfo: TestInfo)`: This function checks if there were any failures in the soft assertions
   and stops the test if there were. The testInfo parameter is the test information object from Playwright.

For Playwright's reference to soft assertions, please
visist [Playwright Soft Assertions](https://playwright.dev/docs/test-assertions#soft-assertions) documentation.

`verify-helper` functions can be used with various `Expect options` parameter type objects. Please refer to
the [Optional Parameter Type Objects](#optional-parameter-type-objects) section below for more information.

### Optional Parameter Type Objects

The `types/optional-parameter-types` module provides a set of options for utility modules.

```typescript
import { getLocator, getLocatorByTestId } from '@ui-element';
import { clickAndNavigate, PressSequentially } from '@ui-actions';
import { expectElementToHaveText } from '@verify-helper';
import { STANDARD_TIMEOUT } from '@timeout';

const loginpage = () => getLocator(`#loginpage`, { hasText: 'login', exact: true });
const successfulMessage = () => getLocatorByTestId(`sucess-message`);

export async function verifyLoginPageisDisplayed() {
  // ClickOptions
  await clickAndNavigate(loginpage(), { button: 'right', force: true, clickCount: 1 });

  // PressSequentiallyOptions
  await PressSequentially(`#username`, 'testuser', { delay: 100, noWaitAfter: false });

  // ExpectTextOptions
  await expectElementToHaveText(successfulMessage(), 'Login is Successful', {
    ignoreCase: true,
    timeout: STANDARD_TIMEOUT,
  });
}
```

In this example, we're using some optional parameters with utility functions as described:

1. `Locator options`: `hasText` and `exact` are used as an optional parameters to locate the element that has the exact
   given text.

2. `Action Options(ClickOptions)`: `button` option is used to specify the mouse button for clicking (default is
   left-click, but can be set to right-click). `force` option allows bypassing actionability checks to force a click (by
   default, this is false, meaning actionability checks are enforced), and `clickCount` option specifies the number of
   times an element should be clicked (with a default of `1`).

3. `Action Options(PressSequentiallyOptions)`: `delay` is used to simulate the delay between the key presses with the
   given time in ms, `noWaitAfter` is used to specify not to wait after the action `PressSequentially`.

4. `ExpectOptions(ExpectTextOptions)`: `ignoreCase` option is utilized to perform case-insensitive assertions (by
   default, it is set to `false`, which implies case-sensitive assertions). The `timeout` option specifies the duration
   to wait before failing the test, thereby overriding the default `expect` timeout defined in
   the `playwright.config.ts` file. This allows for either a longer or shorter timeout period as required.

### Importing Utility Functions

#### Importing Direct Function

This method is useful when you know the specific function you need from the utility library that you need for your task.
Instead of importing the whole library, you can just import the one function that you need.

The import statements from the above utility examples follow this approach.

```typescript
import { getLocator, click, expectElementToHaveText, switchPage, isElementAttached } from '@ui-actions';

const loginpage = () => getLocator(`#loginpage`, { hasText: 'login', exact: true });

await click(loginpage());

await expectElementToHaveText(successfulMessage(), 'Login is Successful');

await switchPage(1);

await isElementAttached(`#locator`);
```

#### Importing Utility Directory

This method is good when you don't know all the functions in the utility library that you need for your task. In these
cases, it's easier to import the whole library instead of just certain functions. Typing `<directoryname>.` will list
all the functions in that library, so you can choose the one that fits your need.

```typescript
import { ActionUtils, AssertUtils, ElementUtils, PageUtils, LocatorUtils } from '@ui-actions';

const loginpage = () => LocatorUtils.getLocator(`#loginpage`, { hasText: 'login', exact: true });

await ActionUtils.click(loginpage());

await AssertUtils.expectElementToHaveText(successfulMessage(), 'Login is Successful');

await PageUtils.switchPage(1);

await ElementUtils.isElementAttached(`#locator`);
```

### Test Annotations

Test annotations are a powerful feature of the Playwright Test that allows you to modify the behavior of individual
tests. You can use them to mark a test as slow, skip it, indicate that it needs to be fixed, group tests, and much more.
They provide a flexible way to manage your tests and handle different scenarios.

Here are some examples of how to use test annotations:

```typescript
import { test } from '@pagesetup';

test.fixme('This test will fail and needs to be fixed so it will be skipped', async () => {});

test.slow('Triples the default timeouts for this test', async () => {});

test.skip('Skip this test', async () => {});
```

1. `fixme`: marks the test as failing. Playwright Test will not run this test. Use `fixme` when running the test is
   slow, crashes, or needs any fixes. This allows you to temporarily disable a test until it can be fixed.

2. `slow`: marks the test as slow and triples the timeout. Use `slow` when a test takes longer than usual to complete.
   This allows Playwright Test to adjust its behavior and avoid prematurely terminating the test.

3. `skip`: marks the test as irrelevant. Playwright Test does not run such a test. Use skip when a test is not
   applicable in some configurations. This allows you to exclude certain tests based on specific conditions or
   configurations.

For more info on test annotations, please refer
to [Playwright Test Annotations documentation](https://playwright.dev/docs/test-annotations)
