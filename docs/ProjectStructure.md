## Project Structure

This project is meticulously organized into distinct packages and files, each tailored for a specific purpose:

- **.husky**: Husky streamlines the management of Git hooks, allowing for the execution of specific scripts during
  various Git stages. In this framework, Husky is configured to prevent commits with linting errors by running
  the `npm run lint` command (which maps to `eslint . --ext .ts` as defined in `package.json` under the `scripts`
  section) before every commit. If linting errors are detected, commits are halted until the issues are addressed.

  > **Tip**: Quickly rectify linting errors by running the `npm run lint:fix` command. Once resolved, you can proceed
  > with commits if the Husky hook is successful.

- **docs**: This directory hosts the images and document files referenced in README.md.

- **node_modules**: This directory houses our project's external dependencies and libraries, ensuring precise version
  control as defined in the "package.json" file.

- **src**: This directory is the core of the project, housing the source code, tests, utilities, and configurations. It
  is further divided into the following subdirectories:

  - **config-test**: This directory is pivotal for initializing the testing framework and setting up the environment.
    It
    contains configurations, initializations, and any global setups required for the tests to run.
    The [Global config test](../src/config-test/README.md) section provides a deeper dive into how the framework
    is
    structured and how pages are initialized for testing.

  - **page-objects**: This directory houses the [page objects](../src/page-objects/README.md) that encapsulate the
    elements and
    actions specific to each page or component of the application. Page Object Model (POM) is a design pattern that
    enhances test maintainability and reduces code duplication.

  - **testdata**: This directory is dedicated to storing test data, which is often externalized from test scripts to
    allow for easier management and data-driven testing. The data is primarily formatted as JSON objects, making it
    easily readable and modifiable without delving into the test scripts themselves.

  - **tests**: This directory houses the framework setup, end-to-end test files, API tests, and associated
    utilities. The
    tests are organized as:

    - **specs**: Here, you'll find all the [spec files](../src/tests/README.md). These are
      the actual
      test scripts, written to test specific functionalities or features of the application. Each spec file
      usually
      corresponds to a feature or functionality, containing one or multiple test scenarios related to it.

  - **utilities**: This directory is dedicated to housing utility functions that streamline test development and
    enhance code reusability. The utilities encompass various functionalities like handling frames, managing
    alerts,
    asserting elements, and more. These utilities are designed to simplify test scripts and ensure consistency
    across
    tests.

    - **constants**: This directory holds constants for defined timeouts and also for load state that maintains
      consistent default LoadState across applications.

    - **setup**: This directory holds the code for custom logger `Winston`.

    - **types**: This directory contains type definitions that are used across the framework as optional
      parameters
      for the utility methods.

    - **utils**: A crucial directory that encompasses all test-related [utility functions](Utilities.md). These
      are
      reusable functions or methods written to perform common tasks, be it related to data manipulation, element
      interaction, or any other recurrent actions or assertions in the test scripts.

- **.eslintignore**: This file keeps the code repository neat by specifying which files and directories should be
  ignored by the ESLint configuration. We've pre-added the kinds of files that ESLint should ignore and also more files
  can be added here as per your project needs. Normally, we check all ".ts" files to make sure the linting configuration
  is followed.

- **.eslintrc**: This file is the heart of the ESLint configuration. ESLint is a static code analysis tool that
  identifies problematic patterns found in Typescript code. The configurations in `.eslintrc` dictate the rules and
  standards the code should adhere to, ensuring consistency and best practices across the codebase.

- **.gitattributes**: This file helps to manage how line endings are handled in files when you're working on code with
  different operating systems. It allows you to define how Git should process line endings in files during the stages of
  code checkout and commit. `* text=auto eol=lf` in this file, makes sure that all text files use the LF (Line Feed)
  style for line endings, keeping things consistent regardless of the operating system.

- **.gitignore**: This file ensures the repository's cleanliness by listing files and directories that Git should not
  track. It typically excludes node modules, build folders, and temporary files, ensuring only essential code and files
  are versioned.

- **.prettierignore**: This file helps keep the repository tidy by specifying which files and directories should be
  ignored by the Prettier formatter. We've pre-added the kinds of files that Prettier formatter should ignore and also
  more files can be added here as per your project needs. Normally, We check all ".ts" and ".md" files to ensure they
  follow the configured formatting rules.

- **.prettierrc**: Prettier is an opinionated code formatter, ensuring that the code adheres to a consistent style.
  The `.prettierrc` file contains specific formatting rules, like line length, indentation, and more, ensuring that
  every developer working on the project produces code with a consistent style.

- **package.json**: Acts as the manifest for your project, detailing metadata like the project's name, version, and
  description. More importantly, it lists the project's dependencies and devDependencies, scripts that can be run, and
  other configurations.
- **package-lock.json**: This is an auto-generated file that provides detailed versioning of each package and its
  dependencies. It ensures that every install results in the exact same file structure in `node_modules` across all
  setups, leading to consistent behavior and builds.

- **playwright.config.ts**: This configuration file is pivotal for the Playwright testing framework. It centralizes
  settings specific to Playwright, detailing configurations for various browsers (like Chrome, Firefox, Safari) and
  devices. Within this file, you can specify configurations such as viewport sizes, user agent strings, launch options,
  and more. These settings ensure that tests run consistently across different environments and scenarios, replicating
  real-world conditions.

- **README.md**: The initial file seen in a repository, the [README.md](../README.md) offers a snapshot of the project.
  It details the project's purpose, setup instructions, and usage. A well-structured README aids in onboarding new team
  members and offers clarity to stakeholders.

- **tsconfig.json**: This configuration file is essential for TypeScript projects. It specifies the root files and the
  compiler options required to compile the TypeScript project. It can dictate various settings, from the target
  JavaScript version, module system, and source map options, to including or excluding specific files or directories.
