import { addColors, createLogger, format, transports } from 'winston';
import path from 'path';
import moment from 'moment-timezone';
import { getEnv } from '@test-env';
import { Reporter, TestCase, TestError, TestResult } from '@playwright/test/reporter';

/**
 * Custom colors for the logger
 */
const customColors = {
  info: 'blue',
  error: 'red',
};
addColors(customColors);

// Change to 'logs' folder
const currentDir = path.resolve(__dirname, '..', '..', '..', 'test-results', 'logs');
const loggingDir = path.resolve(getEnv.LOG_DIR || currentDir);

// Function to format log entries with timestamp and timezone
const customFormat = format.printf(({ timestamp, level, message }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Set the desired timezone
//const timeZone = "Europe/London"; // For the UK
// const timeZone = 'America/New_York'; // For the US
const timeZone = 'Asia/ho_chi_minh'; // For Vietnam

export const logger = createLogger({
  format: format.combine(
    format.colorize({ all: true }),
    format.timestamp({ format: () => moment().tz(timeZone).format() }),
    customFormat,
  ),
  transports: [
    new transports.Console({ level: 'debug' }),
    new transports.File({
      filename: path.join(loggingDir, 'test_run.log'),
      maxFiles: 5, // Number of log files to retain
      maxsize: 300 * 1024, // 10 * 1024 ==10 KB, specify the size in bytes
      level: 'info',
    }),
    new transports.File({
      filename: path.join(loggingDir, 'test_error.log'),
      maxFiles: 5, // Number of log files to retain
      maxsize: 10 * 1024, // 10 KB, specify the size in bytes
      level: 'error',
    }),
  ],
});

/**
 * CustomLogger class that implements the Reporter interface from Playwright
 */
export default class CustomLogger implements Reporter {
  /**
   * Logs the start of a test case
   * @param {TestCase} test - The test case that is starting
   */
  onTestBegin(test: TestCase): void {
    logger.info(`Test Case Started : ${test.title}`);
  }

  /**
   * Logs the end of a test case
   * @param {TestCase} test - The test case that ended
   * @param {TestResult} result - The result of the test case
   */
  onTestEnd(test: TestCase, result: TestResult): void {
    if (result.status === 'passed') {
      logger.info(`\x1b[32mTest Case Passed : ${test.title}\x1b[0m`); // Green color
    } else if (result.status === 'skipped') {
      logger.info(`\x1b[33mTest Case Skipped : ${test.title}\x1b[0m`); // Yellow color
    } else if (result.status === 'failed' && result.error) {
      // Playwright build-in reporter logs the error
      logger.error(`Test Case Failed: ${test.title} Error: ${result.error.message}`);
    }
  }

  /**
   * Logs an error
   * @param {TestError} error - The error
   */
  onError(error: TestError): void {
    logger.error(error.message);
  }
}
