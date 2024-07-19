# Constants

This directory contains TypeScript modules that define constants used throughout the Playwright project. These constants ensure consistent behavior and easy configuration of timeouts and load states.

---

## Modules

### `timeouts.ts`

This module provides Timeout constants, which are used throughout the project to manage timing configurations for various actions, conditional statements, and assertions.

#### Usage

Instead of hard-coding timeout values, import these constants to maintain consistency and improve maintainability:

```typescript
import { SHORT_TIMEOUT, MEDIUM_TIMEOUT, LONG_TIMEOUT } from '@timeouts';

await page.waitForResponse(response => response.status() === 200, { timeout: LONG_TIMEOUT });
```

### `load-state.ts`

This module defines constants related to page load states and visibility settings, which are crucial for controlling how page interactions are handled.

#### Contents

- `defaultLoadState`: Sets the initial load state for navigations.
- `defaultVisibleOnlyOption`: Configures locators to find only visible elements by default.

#### Usage

These settings are used as defaults in various utility functions to ensure consistent behavior:

```typescript
import { defaultLoadState, defaultVisibleOnlyOption } from '@timeouts';

await page.goto(url, { waitUntil: defaultLoadState });
await page.locator(selector, defaultVisibleOnlyOption).click();
```

## Best Practices

Utilize these constants instead of raw values to allow easy adjustments to timeouts and load settings across multiple test scripts. This approach enhances flexibility and code readability.
