## Environment Configuration

Each machine might have a different path configuration. To automate this, follow these steps:

1. Navigate to the `env` folder:

   ```sh
   cd env
   ```

2. Create or update environment configuration files (`.env.rc`, `.env.qc`, `.env.preview`, etc.) with the respective paths for your machine.

   Example `.env.rc`:

   ```env
   BASE_URL=https://google.com

   # We only need to set the base run/test/result directory, the rest will be created automatically
   BASE_RESULT_DIR={path}/pw-os/test-results/
   TESTDATA_DIR={path}/pw-os/src/data/rc/

   # auto create the following base directories
   SCREENSHOT_DIR=screenshot/
   LOG_DIR=logs/
   ```
