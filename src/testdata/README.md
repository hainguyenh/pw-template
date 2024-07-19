# Test Data Management

Our project's test data is organized into folders corresponding to each environment, allowing tests to run with configurations and data sets that reflect the specifics of each environment. This approach ensures that test data remains isolated and relevant to the environment it pertains to.

### Structure

The `testdata` directory is structured with subdirectories for each environment, such as `rc`, `qc`, and `preview`. Each folder contains data files and configurations specific to that environment:

```
testdata/
│
├── rc/
│   ├── data.json
│   ├── config.json
│   └── ...
│
├── qc/
│   ├── data.json
│   ├── config.json
│   └── ...
│
└── preview/
    ├── data.json
    ├── config.json
    └── ...
```

### Env-Helper Class

The `Env-Helper` class is designed to facilitate the retrieval of environment-specific test data during runtime. This class dynamically selects the appropriate data folder based on the environment setting provided at runtime, ensuring that tests always use the correct data set.

#### Implementation

Here is a basic outline of how the `Env-Helper` class works:

```typescript
// env-helper.ts
import fs from 'fs';
import path from 'path';

export class EnvHelper {
  private environment: string;

  constructor(env: string) {
    this.environment = env;
  }

  // Method to get the full path for the environment-specific data directory
  public getDataPath(): string {
    return path.join(__dirname, '..', 'testdata', this.environment);
  }

  // Method to read a specific file from the environment's data directory
  public readDataFile(fileName: string): any {
    const filePath = path.join(this.getDataPath(), fileName);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  }
}
```

#### Usage

To use the `Env-Helper` class, you need to initialize it with the environment you're running the tests in, which can be dynamically set based on your CI/CD environment variables or any other configuration method.

```typescript

```

### Integrating with Tests

To integrate environment-specific data into your tests, initialize the `EnvHelper` class at the beginning of your test suite and use it to load data as needed:

```typescript
// example.test.ts
```

This setup ensures that your tests are flexible and easily adaptable to different environments by leveraging the designed `Env-Helper` class to manage and retrieve environment-specific test data dynamically.
