FROM php:8.3-fpm

RUN apt-get update && apt-get install -y \
    git zip unzip libpq-dev libonig-dev curl libzip-dev npm \
    && docker-php-ext-install pdo pdo_pgsql zip mbstring bcmath

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN curl -fsSL https://deb.nodesource.com/setup_24.x | bash - \
    && apt-get install -y nodejs

WORKDIR /var/www/html

COPY composer.json composer.lock ./
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 9000 5173

CMD ["sh", "-c", "php artisan key:generate && php artisan serve --host=0.0.0.0 --port=9000 & npm run dev"]
