#!/usr/bin/env bash
set -e
cd /app

if [ -f artisan ]; then
  php artisan config:cache || true
  php artisan route:cache  || true
  php artisan view:cache   || true
  if [ "${RUN_MIGRATIONS}" = "true" ]; then
    php artisan migrate --force || true
  fi
fi
