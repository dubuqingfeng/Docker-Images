# About NodeJS of Docker
# 
# Version:1.0.0

FROM centos:7
LABEL maintainer="Dubu Qingfeng <1135326346@qq.com>"

RUN yum -y update; yum clean all

# install the epel

RUN yum -y install epel-release; yum clean all

# install the nodejs and npm

RUN yum -y install \
      nodejs \
      npm ; \
    yum -y clean all

RUN npm install express serve-favicon config morgan async node-minify \
    handlebars lodash walk pm2

ADD . /src

RUN cd /src

EXPOSE 1337

CMD ["node", "/src/app.js"]
