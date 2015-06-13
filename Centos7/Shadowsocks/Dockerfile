# About shadowsocks of Docker
# 
# Version:1.0.0

FROM centos:7
MAINTAINER Dubu Qingfeng <1135326346@qq.com>

ENV REFRESHED_AT 2015-06-05

RUN yum -y update; yum clean all
RUN yum -y install epel-release; yum clean all
RUN yum install -y python-pip m2crypto; yum clean all
RUN pip install shadowsocks

ENTRYPOINT ["/usr/bin/ssserver"]
