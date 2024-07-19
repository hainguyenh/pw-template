<div align="center">

# 🚀 Elevate Your Automation: Redefining the Future of Testing, Where Precision Meets Efficiency.

## Playwright TypeScript Framework: "Your One-Stop Solution for Web (Desktop & Mobile), API, and Electron Automation Testing"

</div>

---

Welcome to the Playwright TypeScript Framework. This unique and comprehensive automation framework is designed to simplify and streamline the process of writing and managing automated tests for Web (Desktop & Mobile), APIs, and Electron Desktop applications. It's built on [Playwright](https://playwright.dev/), a powerful browser automation library, and [TypeScript](https://www.typescriptlang.org/), a statically typed superset of JavaScript, offering a robust and efficient environment for end-to-end testing.

This framework is ideal for QA professionals, developers, and business analysts looking to improve their testing practices and efficiency. It's equipped with utilities that simplify test creation and maintenance, allowing you to focus on writing your tests out of the box.


## Key Features:

- **Page Object Model Design Pattern as Functions**: Our Page Object Model (POM) design stands apart from traditional POMs. It's a other approach that significantly reduces complexity and accelerates coding, making it easier and faster to write scripts compared to traditional POMs. This means less time spent on setup and more time spent on creating effective tests. [Click me for more details](src/page-objects/README.md)

- **Ease of Use**: Designed to be intuitive and user-friendly, making it an excellent choice for beginners to understand and write scripts. This means less time spent on learning the tool and more time spent on creating effective tests.

- **User-Friendly for All Roles**: This framework is not just for QA Automation professionals. Developers, Manual QA, and Business Analysts can also contribute to end-to-end testing, promoting collaboration across different departments and roles.

- **Utility Functions**: Simplifies element identification, performing general actions like button clicks, data input and asserting results. Additionally, it includes built-in functions for managing conditions and ensures a consistent default LoadState across applications.

- **Customizable**: Easily adaptable to meet individual project needs, fitting seamlessly into any project, regardless of its specific requirements or constraints.

- **Inbuilt CI/CD Support with GitHub Actions**: Facilitates continuous integration and continuous delivery with inbuilt support for GitHub actions, automating your testing process from code integration to delivery.

- **Versatile Support**: It facilitates testing across Web (Desktop & Mobile),APIs and, Electron Desktop apps, allowing comprehensive testing across different platforms and applications.

- **Detailed Reporting**: Provides screenshots, videos, and traces of test failures, making it easier to debug and resolve the issues.

- **Local Web Server**: Allows you to test UI code changes directly on your local machine or on a VM, by effortlessly initializing a local web server, eliminating the need for a separate testing environment.

In summary, the Playwright TypeScript Framework is a powerful, flexible, and user-friendly tool that leverages the power of Playwright and TypeScript. It's an excellent choice for teams looking to improve their testing practices and efficiency.

## Table of Contents

- [**Getting Started**](#getting-started)
  - [Tools & Frameworks](#tools--frameworks)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [**Project Structure**](#project-structure)
  - [Local support set up script](.local-support-script/README.md)
  - [Documentations](docs/README.md)
  - [Environment](env/README.md)
  - [Source code](src/README.md)
    - [Global Config](src/config-test/README.md)
    - [Page Object Model](src/page-objects/README.md)
    - [Test data](src/testdata/README.md)
    - [Tests](src/tests/README.md)
    - [Utilities](src/utils/README.md)
- [**Usage**](#usage)
  - [Working with Page Objects](#page-objects)
  - [Using Utilities](#utilities)
  - [Creating a test script](src/tests/README.md#writing-tests-in-a-spec-file)
- [**Executing Tests**](#executing-tests)
  - [Run tests using Playwright Test for VSCode Extension](#run-tests-using-playwright-test-for-vscode-extension)
  - [Command-Line Execution](#running-tests-via-the-command-line-interface)
  - [Report Generation and Viewing](#report-generation-and-viewing)
- [**Additional Playwright Features**](#additional-playwright-features)
- [**Best Practices**](#best-practices)
- [**FAQs**](#faqs)
- [**Issues and Feedback**](#issues-and-feedback)
- [**Contributions**](#contributions)

---

## Getting Started

### Tools & Frameworks

- **[TypeScript](https://www.typescriptlang.org/)**: A statically typed superset of JavaScript programming language, enhancing code quality and understandability.
- **[Playwright Test](https://playwright.dev/docs/test-configuration)**: A modern end-to-end testing framework, facilitating [test creation](https://playwright.dev/docs/api/class-test), [execution](https://playwright.dev/docs/running-tests), [fixture management](https://playwright.dev/docs/test-fixtures), and [report generation](https://playwright.dev/docs/test-reporters).
- **[Playwright Assertions](https://playwright.dev/docs/assertions)**: Provides robust assertion capabilities for validating test outcomes.
- **[Allure Report](https://docs.qameta.io/allure/)**: A flexible and visually appealing reporting tool, that offers clarity on test results.
- **[ESLint](https://eslint.org/)**: A pluggable linting utility for JavaScript and TypeScript, ensuring code consistency and detecting potential errors.
- **[Prettier](https://prettier.io/)**: An opinionated code formatter, ensuring consistent code style across the project.
- **[Logger (Winston)](https://www.npmjs.com/package/winston)**: A versatile logging library, that produces both file-based logs and color-coded console outputs.
- **[Husky](https://www.npmjs.com/package/husky)**: Manages Git hooks to enforce quality checks, such as linting, before commits.
- **[GitHub Actions](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions)**: A CI/CD platform integrated with GitHub, automating workflows like test execution on pull requests. Enhanced with [Playwright's CI guide](https://playwright.dev/docs/ci-intro).

### Prerequisites

Before you begin, there are some essential requirements you must meet. Ensure you have the following software installed on your machine:

- **[npm (v8.0.0 or later)](https://docs.npmjs.com/cli/v9/configuring-npm)**: Package manager for JavaScript, used to install and manage software packages.
  - To verify your current version, use the command `npm -v`. To upgrade to the latest version, please follow the document [here](#installation).
  - If npm isn't installed, follow the [npm installation guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
- **[Node.js (v18.0.0 or later)](https://nodejs.org/en/download)**: JavaScript runtime built on Chrome's V8 JavaScript engine, allowing the execution of JavaScript server-side.
  - To verify your current version, use the command `node -v`. To upgrade to the latest version, please follow the document [here](#installation).
  - if Node.js isn't installed, download and install it from the title link provided.
- **[Git](https://git-scm.com/downloads)**: Distributed version control system used to track changes in source code during software development.
  - To check if Git is installed, run the command `git --version`.
  - If Git isn't installed, download and install it from the [official Git website](https://git-scm.com/downloads).
- **[Visual Studio Code](https://visualstudio.microsoft.com/free-developer-offers/)**: A standalone source code editor that runs on Windows, macOS, and Linux.
  - Download Visual Studio Code suitable for your operating system from the title link provided.
  - For Visual Studio Code shortcuts, please visit [Windows](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf) and [macOS](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf) documents.
- **Visual Studio Code Extensions**:

  - **[Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)**: A VSCode extension for consistent code formatting. Install it directly from the title link provided.
  - **[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)**: A VSCode extension for identifying and fixing linting issues. Install it directly from the title link provided.
  - **[Playwright Test for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)**: A VSCode extension that integrates Playwright testing framework, enabling writing, running, and debugging end-to-end tests directly within VSCode. Install it directly from the title link provided.

    For detailed information on executing tests with this extension, please visit [executing tests with Playwright Test for VSCode](#run-tests-using-playwright-test-for-vscode-extension) documentation.

- **Visual Studio Code Settings**: To ensure consistency with the prettier format settings, apply the following configurations in your VSCode settings (to access the settings window, use `Cmd+,` for Mac and `Ctrl+,` for Windows):
  - **Quote Style**: Set `typescript.preferences.quoteStyle` to `single` for consistent quote usage across your code.
  - **Format On Save**: Enable `Format On Save Mode` and set it to `file`. This ensures your code is automatically formatted every time you save, enhancing readability and consistency.

### Installation

Begin your project by following the steps to install it either with command-line instructions or by doing it step-by-step manually.

#### CLI Installation

This method makes setup easy by avoiding the long steps in the manual installation process. It automatically installs all the dependencies, libraries, playwright browsers, Winston logger, and Husky pre-commit hook that are necessary to start your project. Initializing the project, also intitialises a new Git repository if neither the current nor the parent directory is a Git repository.

The installation steps are below:

- Install Node.js
  Node.js installation can be done directly from the website or through CLI. Find the [Node.js installation steps](https://github.com/vasu31dev/playwright-ts-cli#1-install-nodejs) here.

To upgrade Node.js and npm to their most recent versions, here are some methods listed below:


1. **Download Updated Node Binaries**:

    - The most recent versions of Node.js, including the latest and long-term support (LTS) releases suitable for your device, can be downloaded from the [Node.js](https://nodejs.org/en/) website. When you download the newest version of Node.js, it also includes the latest version of npm.

    - Finally, verify that your update is complete by checking the node version

      ```bash
      node -v
      ```

2. **Using nvm (Node Version Manager) for Linux and macOS**:  
   NVM is a tool that allows you to manage multiple versions of Node on your system. You can use nvm to install, update, and switch between different versions of Node.

   To update your version of Node using nvm, follow the below commands:

    - Check if you already have nvm installed on your system

      ```bash
      nvm --version
      ```

    - If nvm is not installed, install the latest version of nvm using the below command

      ```bash
      curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/$(curl -s https://api.github.com/repos/nvm-sh/nvm/releases/latest | grep 'tag_name' | cut -d\" -f4)/install.sh | bash
      ```

    - Once nvm is installed, check the current version of Node by running the below command

      ```bash
      node -v
      ```

    - Update the version of Node using the following command(this will also install the latest npm version)

      ```bash
      nvm install node --reinstall-packages-from=$(nvm current)
      ```

    - And finally, verify the update is complete by rechecking your Node version

      ```bash
      node -v
      ```

    - If you have many node versions installed and want to specify the version to use at a particular time, we can do it by setting a default alias like this

      ```bash
      nvm alias default [version]
      ```

    - To switch between the installed versions

      ```bash
       nvm use [version]
      ```

3. **Using Package Managers**:

    - **Homebrew on macOS**:
      If you initially installed Node.js with Homebrew, you can upgrade with
      ```bash
      brew update
      brew upgrade node
      ```
    - **Linux Package Managers (like apt for Ubuntu, yum or dnf for Fedora)**:
    - First, update your package repository
      ```bash
      Ubuntu: sudo apt-get update
      Fedora: sudo dnf upgrade or sudo yum update
      ```
    - Then, upgrade Node.js
      ```bash
        Ubuntu: sudo apt-get upgrade nodejs
        Fedora: sudo dnf upgrade nodejs or sudo yum upgrade nodejs
      ```

4. If you encounter errors during the installation process, follow these steps to resolve them:

- Change ownership of the npm directories to the current user:
  ```bash
  sudo chown -R $(whoami) ~/.npm
  ```
- Clear the npm cache forcefully:

  ```bash
  npm cache clean --force
  ```

These steps will help fix permission issues and cache-related problems that might occur during the setup.


### Project Update Guide

Keeping your project up to date is crucial.

## Project Structure

Understanding the project's architecture is key to working with the code. Please refer to the [Project Structure section](src/README.md) for an overview of the directory layout and file organization.

## Usage

### Page Objects

Refer [Page Objects](src/page-objects/README.md) section on how to declare and use. And it can be found in the `src/page-object` directory.

### Utilities

Refer to the [Utilities](src/utils//README.md) section on how to import and use utility functions.

### Writing Tests in a spec file

Tests are written in the `specs` directory. Each test file should correspond to a specific feature or functionality of the application under test. Tests are constructed using Page objects.

Please refer to the [Tests](src/tests/README.md) section for more details.:

#### Parameterising Tests

#### Test and Project parameterization

Playwright supports parameterization both at test level and project level. Sample parameterized test spec file was added as `demo.spec.ts` under `specs` folder for easy reference. For project-level parameterization, please refer to the Playwright documentation [here](https://playwright.dev/docs/test-parameterize#parameterized-projects).

#### Passing environment variables

You can pass environment variables to Playwright test scripts to configure and customize their behavior. These variables are useful for storing sensitive information like API keys and configuring test parameters based on the environment. You can set and use these variables in various ways, from the command line to test configurations. For more information on how to set and use these variables, please refer to the Playwright documentation [here](https://playwright.dev/docs/test-parameterize#parameterized-projects).

#### Test data from CSV file

For a data-driven approach, Playwright supports creating tests from CSV files. For more information, please refer to the Playwright documentation[here](https://playwright.dev/docs/test-parameterize#create-tests-via-a-csv-file).

## Executing Tests

We have the flexibility from executing a single test to executing a specific set of tests, or the entire test suite. Testing can be carried out on a single browser or across multiple browsers simultaneously. By default, tests run in a headless mode, and the test outcome is displayed in the terminal.

### Run tests using Playwright Test for VSCode Extension

**`Playwright Test for VSCode`** extension empowers you to run specific tests or entire test suites directly from the editor. You can conveniently trigger tests with a click, making it efficient to validate changes.

For detailed guidance on configuring test settings in the playwright.config file, and executing tests, please visit [Executing tests using a Playwright Test for VSCode extension](docs/VsCodeSetup.md).

### Parallel Execution

Playwright allows you to execute tests in parallel across multiple workers. This can significantly speed up the execution of your test suite.

To enable parallel execution, add the following line at the top of your spec file, above the `test` block:

```typescript
test.describe.configure({ mode: 'parallel' });
```

The number of workers can be configured either in the `playwright.config` file or via the command-line interface.

### Running Tests via the Command-Line Interface

Utilize a variety of commands to execute your tests in different modes. Below are a few illustrative examples:

#### npm run commands

The `package.json` file contains several scripts designed to streamline test execution. Here are a few common examples:

- To run a single test in chromium headed mode (i.e., with the browser UI visible), use the `grep` command to specify the test:

```bash
npm run test:chromium-headed -- -g 'Successful login will display Products Page'
```

- To run all the tests in a spec file in chromium headless mode:

```bash
npm run test:chromium -- demo.spec.ts
```

- To run all the tests in multiple spec files in headed mode:

```bash
npm run test:chromium-headed -- demo1.spec.ts demo2.spec.ts
```

- To run all the tests in a spec file with 3 threads, and 2 retries in chromium headless mode:

```bash
npm run test:chromium -- demo.spec.ts -j 3 --retries 2
```

- To run in debug mode:

```bash
npm run test:chromium-headed -- -g 'test case name' --debug
```

- To run all the smoke tests using the tag in headless mode for all the projects:

```bash
npm run test -- -g '@smoke'
```

- To run all tests in headless mode for all the projects:

```bash
npm run test
```

#### npx playwright test commands

You can also use the playwright command to run your tests as illustrated in the below example:

```bash
npx playwright test -c playwright.config.ts -g "logo is present @reg" --headed -j 1 --retries 0
```

Here's what each option does:

- `-c`: Specifies the configuration file for Playwright. In this case, it's `playwright.config.ts`.
- `-g`: This is the "grep" option, which allows you to run specific tests instead of all of them. In this case, it's running the test with the name "logo is present @reg".
- `-j`: Specifies the number of workers to use. In this case, it's `1`.
- `--retries`: Specifies the number of times to retry failed tests. In this case, it's `0`.
- `--headed`: Runs the tests in headed mode. By default, tests are run in headless mode.
- `--project=chromium`: Runs the tests in the Playwright Chromium browser. By default, it will run all the projects in the playwright.config.ts
- `--repeat-each 3`: Repeats each test 3 times. This is useful for verifying the stability of a test or checking intermittent issue fixes locally by running the test multiple times.
- `--grep-invert`: The opposite of `-g` or grep. It filters out the tests to run.
- `--max-failures 4`: Stops after the first 4 test failures. This includes a count of failures in the retry test as well.
- `--list`: Lists all the tests, but does not run them.

For more information, please refer to the [Playwright CLI documentation](https://playwright.dev/docs/test-cli).

## Report Generation and Viewing

Playwright Test offers several built-in reporters tailored for various requirements, while also offering the flexibility to seamlessly integrate custom reporters. You can configure these reporters either through the command line or within the `playwright.config.ts` file. For a comprehensive guide on Playwright's in-built reporters, refer to the official [documentation](https://playwright.dev/docs/test-reporters).

### Accessing Reports via Command-Line Interface (CLI)

- **Playwright command**: After executing tests, you can view the reports using the following command:

```bash
npx playwright show-report <path to the report>
```

- **Framework Configured script**: This framework's configuration for viewing reports is defined in the `package.json` under the `scripts` section:

```json
{
  "report" : "playwright show-report playwright-report"
}
```

To access the reports post-test execution using this configuration, run:

```bash
npm run report
```

## Additional Playwright Features

- **UI Mode**: Playwright's UI mode allows you to explore, run, and debug tests in a watch mode. Dive deeper into this feature [here](https://playwright.dev/docs/test-ui-mode).

- **Test Generator**: With Playwright, you can automatically generate tests. It inspects the page to determine the optimal locator, prioritizing by role, text, and test ID locators. Learn more about test generation using `Codegen` [here](https://playwright.dev/docs/codegen).

- **Trace Viewer**: The Playwright Trace Viewer offers a graphical interface to review recorded traces post-execution. Get more details [here](https://playwright.dev/docs/trace-viewer).

## Best Practices

Here are some recommended best practices when using this framework:

- **Use Utility Functions**: Whenever possible, use the [Utilities](src/utils/README.md) functions provided in the framework, instead of directly using Playwright methods. These utility functions are designed to simplify common tasks and make your tests more readable and maintainable.

- **Conditional Statements**: Use functions like `isElementVisible`, `isElementChecked` from [ui actions](src/utils/base/README.md#ui-actions). These functions automatically wait for the element to become visible, with customizable timeout options. If you want to use assertions like expectElementToBeVisible then use functions from [Verify Helper](src/utils/base/README.md#verify-helper).

- **Retrieving Text and Input Values**: To fetch texts or input values, consider functions like `getAllTexts` and `getAllInputValues` from [ui actions](src/utils/base/README.md#ui-actions). These methods come with built-in waits, ensuring they only proceed once an element is available, preventing premature returns of an empty Array<string>.

- **clickAndNavigate vs click**: If a click action triggers page navigation, use the `clickandNavigate` utility function instead of the `click` function. `clickandNavigate` function includes built-in checks for frame navigation and waits for a new page to load. Use the `click` function if it is an Ajax call when you don't navigate to a different page.

- **check vs click**: Use the `check` or `uncheck` utility functions for checkboxes or radio inputs to toggle the state of a checkbox or to choose/deselect a radio option. If you find these functions unreliable or inconsistent during tests, we highly encourage you to provide us with detailed feedback, so we can enhance the functionality of these utilities. Meanwhile, please opt for the `click` function as a substitute for `check`/`uncheck`.

- **Fill vs pressSequentially**: Use the fill utility function as default to fill the form fields. Use pressSequentially utility function when you want to simulate entering character by character likely to be the keyboard press events, such as when testing auto-search suggestions or autofill features. [Playwright type documentation](https://playwright.dev/docs/input#type-characters)

  - **_Optional Parameters - Force & noWaitAfter_**:

    - **force**: In Playwright, the force boolean option in action methods like `click`, `check`, `uncheck`, `dragAndDrop`, `dblclick` etc..., allows bypassing the [actionability](https://playwright.dev/docs/actionability) checks on elements by setting it to `true`. It's useful for simulating actions that require overriding these default checks.

      `await click('#element-id', { force: true })`

    - **noWaitAfter**: Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting by setting this flag to `true`. You would only need this option in exceptional cases such as navigating to inaccessible pages.

      `await click('#submit-button', { noWaitAfter: true })`

- **Web-First Assertions**: Prioritize using playwright web-first assertions in your tests instead of jest or other library assertions. [Playwright Web First Assertions documentation](https://playwright.dev/docs/best-practices#use-web-first-assertions).

- **Soft Assertions for Non-Critical Checks**: Use a soft assertion when a test assertion isn't critical, allowing the test to continue and fail at the end. For critical assertions, use a hard assertion i.e. the default assertion. For more info, please refer [Soft Assertions documentation](src/utils/base/README.md#soft-assertions).

  For Playwright's reference to soft assertions, please visit [Playwright Soft Assertions](https://playwright.dev/docs/test-assertions#soft-assertions) documentation.

- **Backticks for Xpath & CSS**: Always use backticks for Xpath & CSS selectors so that you can use single & double quotes together if needed without any escape characters.

- **Playwright's Inbuilt Features**: Playwright comes with a wide range of inbuilt features. Make sure to utilize these as needed.
  - [Local Webserver](https://playwright.dev/docs/test-webserver)
  - [Mocking](https://playwright.dev/docs/mock)
  - [Parallelism and sharding](https://playwright.dev/docs/test-parallel)
  - [Playwright Configuration](https://playwright.dev/docs/test-configuration)
    - [use Options](https://playwright.dev/docs/test-use-options)
    - [TestConfig](https://playwright.dev/docs/api/class-testconfig)
  - [Mobile Emulation](https://playwright.dev/docs/emulation)
  - [Playwright Test methods](https://playwright.dev/docs/api/class-test)
  - [Debugging](https://playwright.dev/docs/debug)

In addition to these, Playwright also recommends following certain best practices. You can find more details in the [Playwright Best Practices documentation](https://playwright.dev/docs/best-practices)

## FAQs

Please refer to the [FAQ documentation](docs/FAQs.md) for questions about dependencies, libraries, utilities and errors.

## Issues and Feedback

If you encounter any issues or have feedback, please [Raise an Issue](----not yet----) on GitHub.

## Contributions

We welcome contributions! Feel free to submit a [Pull Request](---- not yet ----) on GitHub.
