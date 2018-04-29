FROM tutum/lamp:latest
LABEL maintainer="Dubu Qingfeng <1135326346@qq.com>"

# Install plugins
RUN apt-get update && \
  apt-get -y install php5-gd && \
  rm -rf /var/lib/apt/lists/*

# Download latest version of Fanheo into /app
RUN rm -fr /app && git clone --depth=1 https://github.com/sxau-web-team/fanheo_home.git /app

# Modify permissions to allow plugin upload
RUN chown -R www-data:www-data /app /var/www/html

# Add database setup script
ADD create_mysql_admin_user.sh /create_mysql_admin_user.sh
ADD create_db.sh /create_db.sh
RUN chmod +x /*.sh

# Add the file
ADD index.php /var/www/html/test/index.php

EXPOSE 80 3306
CMD ["/run.sh"]
