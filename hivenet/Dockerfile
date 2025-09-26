# --- build frontend (Node 22) ---
FROM node:22 AS assets
WORKDIR /app
COPY package*.json vite.config.js ./
RUN npm ci
COPY resources ./resources
RUN npm run build

# --- install PHP deps (no-dev) ---
FROM php:8.3-fpm AS vendor
RUN apt-get update && apt-get install -y git zip unzip libicu-dev \
 && docker-php-ext-install intl pdo_mysql \
 && rm -rf /var/lib/apt/lists/*
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --prefer-dist --no-interaction --optimize-autoloader

# --- final runtime: Nginx + PHP-FPM in one image ---
FROM webdevops/php-nginx:8.3
ENV WEB_DOCUMENT_ROOT=/app/public
WORKDIR /app

# extra PHP extensions you use
RUN apt-get update && apt-get install -y libzip-dev libpng-dev libxml2-dev \
 && docker-php-ext-install bcmath exif zip gd \
 && rm -rf /var/lib/apt/lists/*

# app code + vendor + built assets
COPY . .
COPY --from=vendor /app/vendor ./vendor
COPY --from=assets /app/public/build ./public/build

# opcache for prod
RUN set -eux; \
  mkdir -p /usr/local/etc/php/conf.d; \
  { echo 'opcache.enable=1'; echo 'opcache.enable_cli=1'; \
    echo 'opcache.validate_timestamps=0'; echo 'opcache.memory_consumption=192'; \
    echo 'opcache.max_accelerated_files=20000'; } \
  > /usr/local/etc/php/conf.d/opcache.ini

# writable dirs
RUN chown -R application:application storage bootstrap/cache \
 && chmod -R ug+rwX storage bootstrap/cache

# cache config/routes/views (and optional migrations) on boot
COPY docker/entrypoint.sh /docker-entrypoint-init.d/10-artisan.sh
RUN chmod +x /docker-entrypoint-init.d/10-artisan.sh

EXPOSE 80
