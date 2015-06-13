# About shadowsocks of Docker
# 
# Version:1.0.0

FROM ubuntu:14.04
MAINTAINER Dubu Qingfeng <1135326346@qq.com>

ENV REFRESHED_AT 2015-06-05

RUN apt-get -qq update && \
    apt-get install -q -y python-pip python-m2crypto
RUN pip install shadowsocks

ADD shadowsocks.json /etc/

ENTRYPOINT ["/usr/local/bin/ssserver"]
