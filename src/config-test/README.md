## The `config-test` folder contains essential files for setting up and tearing down global states and configurations for your tests. This ensures that each test runs in a consistent environment.

## Table of Contents

- [Global Test Setup](#global-config-setup)
  - Global set up
  - Goabal tear down
  - Page set up
- [How to import](#import-statement)
- [Using in setting](#putting-it-all-together)

## Global Test Setup

### 1. `global-setup.ts`

**Purpose**:
The `global-setup.ts` file is used to perform any necessary setup before all test files are executed. This is where you can initialize global states such as database connections, set environment variables, or perform any other setup required for your tests.

**Usage**:

- Establish database connections
- Set up environment variables
- Initialize any global configurations

**Example**:

```typescript
// global-setup.ts
import { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  // Example: Initialize database connection
  await initializeDatabaseConnection();

  // Example: Set environment variables
  process.env.BASE_URL = 'http://localhost:3000';
}

export default globalSetup;
```

### 2. global-teardown.ts

**Purpose**:
The global-teardown.ts file is used to clean up any global states after all test files have been executed. This ensures that any resources initialized in global-setup.ts are properly disposed of.

**Usage**:

    •	Close database connections
    •	Clean up environment variables
    •	Reset any global configurations

**Example**:

```typescript
// global-teardown.ts
async function globalTeardown() {
  // Example: Close database connection
  await closeDatabaseConnection();

  // Example: Clean up environment variables
  delete process.env.BASE_URL;
}

export default globalTeardown;
```

### 3. test-setup.ts

**Purpose**:
The test-setup.ts file is used to set up the Page object from Playwright before each test. This allows you to add any common setup code that should run before each test across all spec files. It ensures that each test starts with a consistent state.

**Usage**:
• Set up the browser page
• Configure viewport and browser context
• Initialize page objects or components

**Example**:

```typescript
// test-setup.ts
import { test as base } from '@playwright/test';

// Extend the base test to include our custom setup
export const test = base.extend({
  page: async ({ page }, use) => {
    // Example: Set viewport size
    await page.setViewportSize({ width: 1280, height: 720 });

    // Example: Navigate to the base URL
    await page.goto(process.env.BASE_URL || 'http://localhost:3000');

    // Provide the page object to the test
    await use(page);
  },
});

// Export test and expect from the base test
export { expect } from '@playwright/test';
```

## Import Statement:

Include the following import statement in your spec files to set up the page before each test:

```typescript
import { test } from '@pagesetup';
```

## Putting It All Together

Ensure that your Playwright configuration (playwright.config.ts) is set up to use these global setup and teardown files.

**Example Configuration:**

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  globalSetup: require.resolve('./config-test/global-setup'),
  globalTeardown: require.resolve('./config-test/global-teardown'),
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    headless: true,
  },
});
```
