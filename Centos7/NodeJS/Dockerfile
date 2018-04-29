# About NodeJS of Docker
# 
# Version:1.0.0

FROM centos:7
LABEL maintainer="Dubu Qingfeng <1135326346@qq.com>"

ENV REFRESHED_AT 2015-06-05

RUN yum -y update; yum clean all

# install the epel

RUN yum -y install epel-release; yum clean all

# install the nodejs and npm

RUN yum -y install \
      nodejs \
      npm ; \
    yum -y clean all

ADD . /src

RUN cd /src

EXPOSE 1337

CMD ["node", "/src/app.js"]
