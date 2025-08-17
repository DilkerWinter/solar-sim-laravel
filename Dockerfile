FROM php:8.3-fpm as base

RUN apt-get update && apt-get install -y \
    git \
    zip \
    unzip \
    libpq-dev \
    libonig-dev \
    curl \
    libzip-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libicu-dev \
    supervisor \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        pdo \
        pdo_pgsql \
        zip \
        mbstring \
        bcmath \
        gd \
        intl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN curl -fsSL https://deb.nodesource.com/setup_24.x | bash - \
    && apt-get install -y nodejs

WORKDIR /var/www/html

FROM base as development

COPY composer.json composer.lock* ./
COPY package.json package-lock.json* ./

RUN composer install --no-scripts --no-autoloader

RUN npm ci

COPY . .

RUN composer dump-autoload --optimize

RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 storage bootstrap/cache

RUN echo '#!/bin/bash\n\
set -e\n\
while ! nc -z solarsim_postgres 5432; do\n\
  sleep 1\n\
done\n\
\n\
if [ -z "$APP_KEY" ] || [ "$APP_KEY" = "" ]; then\n\
  php artisan key:generate --no-interaction\n\
fi\n\
\n\
php artisan migrate\n\
\n\
php artisan config:clear\n\
php artisan route:clear\n\
php artisan view:clear\n\
\n\
php artisan serve --host=0.0.0.0 --port=9000 &\n\
npm run dev\n\
' > /usr/local/bin/start-dev.sh \
    && chmod +x /usr/local/bin/start-dev.sh

RUN apt-get update && apt-get install -y netcat-traditional && rm -rf /var/lib/apt/lists/*

EXPOSE 9000 5173

CMD ["/usr/local/bin/start-dev.sh"]