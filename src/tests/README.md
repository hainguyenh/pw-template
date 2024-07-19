# Test Organization

Our project’s test scripts are meticulously organized within the `tests` directory. This structure is designed to segregate tests based on their nature and the components they target, making it easier to manage and navigate through them.

### Directory Structure

The `tests` directory is split into two main categories: `e2e` for end-to-end tests and `vital` for critical path tests. Each category further subdivides into directories representing specific customer areas, then into suites and components, allowing us to closely align our tests with the application's structure and functionalities.

```
tests/
│
├── e2e/                  # End-to-end tests
│   └── customer/
│       ├── suite/         # Tests for specific functional areas
│       │   ├── function/    # Test function for a particular area
│       │   └── component/  # Tests for individual components
│       └── ...
│
└── vital/                # Tests for vital application functionalities
    └── customer/
        ├── suite/
        │   ├── function/
        │   └── component/
        └── ...
```

### Example

For example, let's say we have a functionality categorized under customer management within an e-commerce system. The tests might look like this:

```
tests/
│
├── e2e/
│   └── customer/
│       ├── management/
│       │   ├── userCreationSuite/
│       │   │   ├── createUser.test.ts
│       │   │   └── deleteUser.test.ts
│       │   └── userInterfaceComponent/
│       │       └── userDashboard.test.ts
│       └── ...
│
└── vital/
    └── customer/
        ├── management/
        │   ├── loginSuite/
        │   │   ├── loginFunctionality.test.ts
        │   │   └── logoutFunctionality.test.ts
        │   └── accountSettingsComponent/
        │       └── changePassword.test.ts
        └── ...
```

### Usage and Navigation

#### Running Tests

Tests can be executed individually, by suite, or even at the area level, depending on the scope required. For instance, to run all tests within the `userCreationSuite`:

```bash
npm run test -- tests/e2e/customer/management/userCreationSuite/
```

#### Adding New Tests

When adding new tests, ensure they are placed in the correct directory based on the test category (e2e or vital), the relevant customer area, and the appropriate suite or component. This practice helps maintain the organizational integrity and makes automated test execution more streamlined.

### Best Practices

- **Categorize Tests Appropriately**: Ensure tests are categorized not just by type (e2e, vital) but also by relevance to specific areas and functionalities.
- **Maintain Naming Conventions**: Use clear, descriptive names for test files and directories to enhance readability and ease of navigation.
- **Documentation**: Document any complex test logic or setups directly within the test files or accompanying documentation to aid understanding and maintenance.

### Template

**login.spec.ts**

```typescript
// import neccessary modules
// test module
import { test } from '@page-manager';
// allure report
import { allure } from 'allure-playwright';
// logger
import { logger } from '@custom-log';

// Describe test suite
test.describe('Example testing flow', () => {
  // test case
  test('flow 01', async ({ loginPage }) => {
    // log message
    logger.info('This is the message will display in the console');
    // add step to the html report
    await allure.step('Open application', async () => {
      // using page object to call the action
      await loginPage.launchApp();
    });
    // add the other step to html report
    await allure.step('Input username and password', async () => {
      // call action from page
      await loginPage.fillForm('user', 'password');
    });
  });
});
```

In this example, we are setting the page state by importing `test` from `@page-manager` and writing the spec file. Here are some important points to note:

1. Import `test` from `@page-manager` instead from `@playwright/test`. `page-manager` is customized for this framework to set the page state. This ensures that the page is set up correctly before each test.

2. `setPage` function from `page-utils` file will set the page state before each test and is imported to our spec files while executing the tests. If you want to use the Playwright page directly to write our tests, we can use `getPage` function from `page-utils` file. The page object is managed by the framework, and we can use the `setPage` and `getPage` functions to set and get the page state, ensuring that all the pages operate on the same page object.

In the first `test.describe` block of this example, We first navigate to the home page, then perform the login action, and finally verify if the login was successful. Here `LoginPage` represents a login page within the application. It includes methods to navigate to the homepage, perform a login action, and assertions for successful and failed logins.

Similarly, `LoginPage` and `DashboardPage` are also page objects that have functions for their respective pages.

The `beforeEach` hook, is utilized to navigate to the home page before the execution of each test within the `test.describe` block in this file.
