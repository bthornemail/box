#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
port="${1:-8200}"
doc_root="${script_dir}"

# mkdir -p "$doc_root"

echo "Serving $doc_root on http://127.0.0.1:${port}/"

args=(-f -p "$port" -h "$doc_root")

exec busybox httpd "${args[@]}"