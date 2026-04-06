#!/bin/bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

if ! command -v python3 >/dev/null 2>&1; then
  echo "python3 was not found."
  echo "Install Python 3, then run this script again."
  exit 1
fi

pick_port() {
  local requested_port="${1:-}"

  if [[ -n "$requested_port" ]]; then
    if ! lsof -tiTCP:"$requested_port" -sTCP:LISTEN >/dev/null 2>&1; then
      echo "$requested_port"
      return 0
    fi
  fi

  local port
  for port in 8000 8017 8080 8765; do
    if ! lsof -tiTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1; then
      echo "$port"
      return 0
    fi
  done

  echo "Could not find an open port." >&2
  return 1
}

PORT_VALUE="$(pick_port "${PORT:-}")"
APP_URL="http://127.0.0.1:${PORT_VALUE}"

cleanup() {
  if [[ -n "${SERVER_PID:-}" ]]; then
    kill "$SERVER_PID" >/dev/null 2>&1 || true
  fi
}

trap cleanup EXIT

PORT="$PORT_VALUE" python3 server.py &
SERVER_PID=$!

for _ in {1..40}; do
  if curl -fsS "$APP_URL" >/dev/null 2>&1; then
    break
  fi
  sleep 0.25
done

echo "Stock Sale Tax Estimator is running at $APP_URL"
echo "Press Control-C in this window to stop the server."

open "$APP_URL"

wait "$SERVER_PID"
