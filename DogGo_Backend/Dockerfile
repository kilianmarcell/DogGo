FROM php:8.2-cli

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    curl \
    default-mysql-client

RUN docker-php-ext-install pdo_mysql

COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

RUN composer install
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

RUN echo "#!/bin/bash\n\
php artisan migrate\n\
php artisan db:seed\n\
php artisan serve --host=0.0.0.0 --port=8000\n" > /start.sh && chmod +x /start.sh

EXPOSE 8000
CMD ["/start.sh"]
