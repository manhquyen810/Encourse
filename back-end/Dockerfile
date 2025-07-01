# Base image PHP + Apache
FROM php:8.2-apache

# Install dependencies
RUN apt-get update && apt-get install -y \
    git curl zip unzip libpq-dev libzip-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Install Composer
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# Copy Laravel code
COPY . /var/www/html

# Set working dir
WORKDIR /var/www/html

# Install Laravel dependencies
RUN composer install --no-dev --optimize-autoloader

# Set correct permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 storage bootstrap/cache

# Expose port (Render sẽ dùng port này)
EXPOSE 10000

# Start Laravel app
CMD php artisan serve --host=0.0.0.0 --port=10000
