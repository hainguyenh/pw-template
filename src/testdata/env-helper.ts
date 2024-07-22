import path from 'path';
import fs from 'fs';

class RunningEnv {
  private static instance: RunningEnv;
  private readonly __baseDir;

  private constructor() {
    // Private constructor to prevent instantiation
    this.__baseDir = path.resolve(__dirname, '..', '..');
  }

  // Get base url from environment variable
  get BASE_URL(): string {
    return process.env.BASE_URL || '';
  }

  // Get base result directory from environment variable
  get BASE_RESULT_DIR(): string {
    return path.join(this.__baseDir, process.env.BASE_RESULT_DIR || 'test-results');
  }

  // Get log directory from environment variable
  get LOG_DIR(): string {
    const logDir = process.env.LOG_DIR || 'logs';
    return path.join(this.BASE_RESULT_DIR, logDir);
  }

  // Get screenshot directory from environment variable
  get SCREENSHOT_DIR(): string {
    const screenshotDir = process.env.SCREENSHOT_DIR || 'screenshot';
    return path.join(this.BASE_RESULT_DIR, screenshotDir);
  }

  public static getInstance(): RunningEnv {
    if (!RunningEnv.instance) {
      RunningEnv.instance = new RunningEnv();
    }
    return RunningEnv.instance;
  }

  // Get test data directory from environment variable
  testData() {
    const dataFileName = 'testdata.json';
    const testDataPath = path.join(this.__baseDir, process.env.TESTDATA_DIR || '', dataFileName);

    try {
      const testDataContent = fs.readFileSync(testDataPath, 'utf8');
      return JSON.parse(testDataContent);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error reading testdata.json: ${error.message}`);
      }
      return {}; // Return empty object or handle error as needed
    }
  }
}

// Create the singleton instance
const getEnv = RunningEnv.getInstance();
const getTestData = getEnv.testData.bind(getEnv);

// Export the instance and any other global data
export { getEnv, getTestData };
