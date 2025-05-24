FROM php:8.3-fpm

# Instalar dependências do sistema e extensões PHP necessárias
RUN apt-get update && apt-get install -y \
    libpq-dev libzip-dev zip unzip git curl libonig-dev libxml2-dev \
    && docker-php-ext-install pdo_pgsql zip bcmath opcache

# Instalar Composer globalmente (faltava isso!)
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Instalar Node.js 24 e atualizar npm
RUN curl -fsSL https://deb.nodesource.com/setup_24.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@latest

WORKDIR /var/www/html

# Copiar todo o projeto para dentro do container
COPY . .

# Instalar dependências PHP (sem dev e otimizado)
RUN composer install --no-dev --optimize-autoloader

# Instalar dependências Node e build front-end React/Vite/Inertia
RUN npm install && npm run build

# Ajustar permissões para storage e cache do Laravel
RUN chown -R www-data:www-data storage bootstrap/cache

EXPOSE 9000

CMD ["php-fpm"]
