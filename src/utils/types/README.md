The types provided in this module extend the default parameters of Playwright's built-in methods, tailored to fit the specific needs of our project. They are categorized into several areas reflecting their usage in navigation, actions, assertions, and element selection.

---

## Type Categories

### 1. Navigation Options

These types assist with navigation-related actions, including page loading and reloading, enhancing the default Playwright types with additional flexibility and control options.

- `GotoOptions`: Extends the options for the `goto` method.
- `NavigationOptions`: General navigation options used across various methods.
- `WaitForLoadStateOptions`: Specific options for waiting for different document load states.

### 2. Action Options

Defines options for user interactions such as clicking, typing, and uploading files, integrated with visibility and stability enhancements.

- `ClickOptions`: Options for the `click` method, including visibility and stability tweaks.
- `FillOptions`: Extends filling input fields with additional stability settings.
- `UploadOptions`: Options for handling file inputs, along with visibility and stability adjustments.

### 3. Expect Options

Used for configuring expectations in tests, such as timeouts and message customization, to tailor assertion behavior.

- `ExpectOptions`: Combines timeout settings, soft assertion options, and custom messages.

### 4. Locator Options

Enhances locator methods with additional parameters to control visibility and other attributes, making element selection more precise and tailored.

- `LocatorOptions`: Options for general locator methods, incorporating visibility as a key parameter.

## Usage

To use these types, import them into your test scripts or utility modules where Playwright actions are performed. This ensures that all method calls are type-checked, reducing the likelihood of runtime errors due to incorrect parameters.

### Example

```typescript
import { ClickOptions, ExpectOptions } from './types';

// Using defined types to enhance method calls
const clickOptions: ClickOptions = { onlyVisible: true, stable: true };
const expectOptions: ExpectOptions = { timeout: 5000, soft: true };

await page.click(selector, clickOptions);
await expect(page).toHaveText('expected text', expectOptions);
```

## Best Practices

- **Consistency**: Utilize these types consistently across all test scripts to maintain a standard approach to handling Playwright method parameters.
- **Extension**: Extend these types as necessary to accommodate new features or changes in Playwright's API.
