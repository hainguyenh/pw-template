# Page Objects

This folder contains the implementation of the Page Object Model (POM) for your tests. The Page Object Model helps in creating an abstraction layer for the UI elements, promoting reusability and maintainability of your test code.

---

## Table of Contents

- [**Page Manager**](#page-manager)
  - Handles instances of pages and widgets.
- [**Page & Widget**](#page-and-widget)
  - Contains all page & widget objecs
- [**How to use**](#page-&-widget)
  - Declare directly in class at the top section
  - Declare in constructor
  - Import library

---

## Page Manager

The Page Manager is responsible for managing instances of all pages and widgets used in your tests. It provides a centralized way to initialize and access different page objects and widgets throughout your tests.

## Page and Widget

The pages folder contains individual page objects. Each page object class encapsulates the functionality and interactions specific to a page. This includes methods for navigating to the page, interacting with UI elements, and asserting conditions on the page.

## How to use

Here's an example of a page object under the `page-objects` package:

**1. Directly**

```ts
export class LoginPage {
  private readonly emailTxt = () => getLocator('input[name=username]');
  private readonly nonSsoBtn = () => getLocatorByText('Non-SSO');
  private readonly passwordTxt = () => getLocator('input[name=password]');

  // How to call
  async fillForm(username: string, password: string) {
    // need added () after field
    await fill(this.emailTxt(), username);
    if (await isElementVisible(this.nonSsoBtn())) {
      await click(this.nonSsoBtn());
    }
    await fill(this.passwordTxt(), password);
  }
}
```

**2. In Constructor**

```ts
export class LoginPage {
  private readonly emailTxt;
  private readonly nonSsoBtn;
  private readonly passwordTxt;
  private readonly signInBtn;
  private readonly requestAnOsAccountBtn;

  constructor() {
    this.emailTxt = getLocator('input[name=username]');
    this.nonSsoBtn = getLocatorByText('Non-SSO');
    this.passwordTxt = getLocator('input[name=password]');
    this.signInBtn = getLocatorByRole('button', { name: 'SIGN IN' });
    this.requestAnOsAccountBtn = getLocator('text=Request an OS Account');
  }

  /**
   * Fill the login form with the username and password - Non-SSO
   * @param username : username
   * @param password : password
   */
  async fillForm(username: string, password: string) {
    // log the step to the report
    await fill(this.emailTxt, username);
    if (await isElementVisible(this.nonSsoBtn)) {
      await click(this.nonSsoBtn);
    }
    await fill(this.passwordTxt, password);

    return this;
  }
}
```

**3. Import library**

```typescript
import { allure } from 'allure-playwright';
import { getEnv } from '@testdata/env';
import { logger } from '@utils/log/custom-logger';
import { getLocator, getLocatorByRole, getLocatorByText } from '@utils/base/ui-element';
import { gotoURL } from '@utils/base/page-factory';
import { isElementVisible, waitForElementToBeHidden, waitForElementToBeVisible } from '@utils/base/ui-waits';
import { click, fill } from '@utils/base/ui-actions';
```

Refer to the [Utilities](src/utils/README.md) section on how to import and use utility functions.
