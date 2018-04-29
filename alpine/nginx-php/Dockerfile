FROM php:7.1-fpm-alpine

RUN apk update && apk add  --no-cache \
    mc \
    libmcrypt \
    libmcrypt-dev \
    libpng \
    libpng-dev \
    libjpeg-turbo \
    libxml2-dev  \
    libjpeg-turbo-dev

RUN docker-php-ext-install pdo pdo_mysql gd mbstring bcmath xml zip

# Install composer
#ONBUILD ARG GITHUB_OAUTH_TOKEN
#
#ONBUILD RUN set -xe \
#    && curl -sS https://getcomposer.org/installer | php \
#    && mv composer.phar /usr/local/bin/composer \
#    && composer config -g github-oauth.github.com $GITHUB_OAUTH_TOKEN

# Copy the PHP-fpm and php conf
COPY config/php/php.ini /usr/local/etc/php/php.ini

# Copy source code
COPY src /var/www/html

USER www-data
CMD ["php-fpm"]