# About Mongodb of Docker
# 
# Version:1.0.0

FROM centos:7
LABEL maintainer="Dubu Qingfeng <1135326346@qq.com>"

RUN yum -y update; yum clean all
RUN yum -y install epel-release; yum clean all
RUN yum -y install mongodb-server; yum clean all
RUN mkdir -p /data/db

EXPOSE 27017
ENTRYPOINT ["/usr/bin/mongod"]
