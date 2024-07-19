#!/bin/bash

# Get the current working directory
cd ..
current_dir="$(pwd)"

echo "Current dir: ${current_dir}"
# Define the paths
# Check if an environment is passed as a parameter, default to "rc" if not
env_selected="${1:-rc}"
base_dir="${current_dir}/test-results/"
testdata_dir="${current_dir}/src/testdata/${env_selected}/"



# Function to update or add an environment variable in .env.rc
update_env_var() {
    local key="$1"
    local value="$2"
    local file="./env/.env.${env_selected}"

    # Escape paths for sed usage (replace '/' with '\/')
    # shellcheck disable=SC2155
    # shellcheck disable=SC2001
    local escaped_value=$(echo "$value" | sed 's_/_\\/_g')

    # Using -i'' for compatibility with macOS's sed
    sed -i "" "s/$key=.*/$key=$escaped_value/g" "$file"

}

# Update the .env.rc file with the new directory paths
update_env_var "BASE_RESULT_DIR" "$base_dir"
update_env_var "TESTDATA_DIR" "$testdata_dir"

echo "Updated .env.rc with:"
echo "BASE_RESULT_DIR=${base_dir}"
echo "TESTDATA_DIR=${testdata_dir}"
