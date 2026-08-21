#!/usr/bin/env bash
#
# Build and publish the site to a Contabo VPS.
#
# Builds locally, then syncs dist/ to the server over rsync. The swap is done
# by writing to a temporary directory and moving it into place, so a visitor
# never sees a half-copied release.
#
# Usage:
#   ./deploy/deploy.sh user@your-server.example.com
#
set -euo pipefail

TARGET="${1:?usage: deploy.sh user@host}"
REMOTE_ROOT="${REMOTE_ROOT:-/var/www/bigblock}"

echo "==> Installing dependencies"
if command -v bun >/dev/null 2>&1; then
  bun install --frozen-lockfile
else
  npm ci
fi

echo "==> Building"
if command -v bun >/dev/null 2>&1; then
  bun run build
else
  npm run build
fi

if [ ! -f dist/index.html ]; then
  echo "Build did not produce dist/index.html — aborting." >&2
  exit 1
fi

echo "==> Uploading to ${TARGET}:${REMOTE_ROOT}"
rsync -az --delete \
  --exclude '.DS_Store' \
  dist/ "${TARGET}:${REMOTE_ROOT}/dist.incoming/"

echo "==> Swapping release"
ssh "${TARGET}" bash -s <<REMOTE
set -euo pipefail
cd "${REMOTE_ROOT}"
rm -rf dist.previous
if [ -d dist ]; then mv dist dist.previous; fi
mv dist.incoming dist
echo "Release live. Previous build kept at ${REMOTE_ROOT}/dist.previous"
REMOTE

echo "==> Done"
