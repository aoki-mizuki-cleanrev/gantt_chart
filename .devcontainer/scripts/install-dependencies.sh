#!/usr/bin/env bash
set -eu -o pipefail

# --- Install mysql-client
sudo apt update
sudo apt install -y default-mysql-client vim

echo "mysql-client installed successfully"