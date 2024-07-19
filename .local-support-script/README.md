# Local Support Script

This project contains scripts to automate environment path updates for different machines. The scripts are designed to simplify and streamline the setup process by automatically configuring paths based on the environment.

---

## Table of Contents

- [Running the Script](#running-the-script)
- [What value will be updated?](#what-value-will-be-updated)
- [Detail Script](#detail-script)

---

### Running the Script

To run the script:

1. Ensure you are in the project root directory.
2. Execute the main script:

   ```sh
   npm run prepare
   ```

   This will trigger the environment setup and run any necessary scripts defined in your local support script.

   Please note that default environment is `RC`

3. To specify a different environment (e.g., `QC`):

   ```sh
   npm run prepare -- qc
   ```

### What value will be updated?

```ts
BASE_RESULT_DIR={your_path}/pw-os/test-results/
TESTDATA_DIR={your_path}/source_code/pw-os/src/data/rc/
```

3. Use the provided script to update paths automatically. This script will read the appropriate environment file based on your current setup.

   Example script usage:

   ```sh
   # Default to 'rc' environment
   ./update_paths.sh

   # Specify 'qc' environment
   ./update_paths.sh qc
   ```

   The script will detect your environment and update the paths accordingly.

### Detail script

The script updates the `.env` files with the new directory paths for `BASE_RESULT_DIR` and `TESTDATA_DIR`.

```sh
#!/bin/bash

# Get the current working directory
current_dir=$(pwd)

# Check if an environment is passed as a parameter, default to "rc" if not
env_selected="${1:-rc}"

# Define the paths
base_dir="${current_dir}/test-results/"
testdata_dir="${current_dir}/src/data/${env_selected}/"

# Function to update or add an environment variable in .env file
update_env_var() {
    local key="$1"
    local value="$2"
    local file="./env/.env.${env_selected}"

    # Escape paths for sed usage (replace '/' with '\/')
    local escaped_value=$(echo "$value" | sed 's_/_\\/_g')

    # Using -i'' for compatibility with macOS's sed
    sed -i "" "s/$key=.*/$key=$escaped_value/g" "$file"
}

# Update the .env file with the new directory paths
update_env_var "BASE_RESULT_DIR" "$base_dir"
update_env_var "TESTDATA_DIR" "$testdata_dir"

echo "Updated .env.${env_selected} with:"
echo "BASE_RESULT_DIR=${base_dir}"
echo "TESTDATA_DIR=${testdata_dir}"
```

By following these steps, you can ensure that the environment paths are correctly configured for your project.
