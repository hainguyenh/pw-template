# Logging

This directory contains the logging configuration for the Playwright tests, utilizing Winston for logging various events and states during the test execution.

---

## Overview

The logging setup is designed to capture detailed logs for debugging and auditing test executions. It includes configurations for different log levels and file management to ensure efficient log handling.

## Features

- **Custom Log Colors**: Defines specific colors for different log levels to enhance readability.
- **Log Rotation**: Manages log files to prevent excessive disk usage, using rotation based on file size and count.
- **Time Zone Support**: Logs include timestamps adjusted to specified time zones for global compatibility.

## Configuration

The logger is configured to output logs to both the console and file-based logs within the `test-results/logs` directory, ensuring logs are available both during development and in production environments.

### Modules

#### Custom Colors and Log Directory Setup

Colors for `info` and `error` logs are customized to blue and red, respectively. The log directory defaults to a specified path but can be overridden by an environment variable.

#### Log Formatting

Logs are formatted to include a timestamp, log level, and the message. Timestamps are formatted according to the specified time zone.

#### Transports

- **Console Transport**: Logs to the console with a debug level.
- **File Transport**: Separate files for general and error logs, with constraints on file size and number.

## Usage

### Integration with Playwright

The `CustomLogger` class implements the Playwright `Reporter` interface, allowing it to integrate seamlessly with the Playwright test runner. It handles specific test events such as the beginning and end of tests, and logs additional information about test failures.

### Examples

Logging within a test case:

```typescript
import { logger } from '@custom-log';

logger.info('This is an informational message');
logger.error('This is an error message');
```

## Best Practices

- **Consistency**: Use the provided logger instances to ensure consistent logging practices across all tests.
- **Error Handling**: Utilize the error logging to capture and diagnose issues during test failures effectively.

## Dependencies

- `winston`: Used for creating and managing the logger.
- `moment-timezone`: For formatting timestamps according to different time zones.
- `path`: For handling file paths.

```

```
