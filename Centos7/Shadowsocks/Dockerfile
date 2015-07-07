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

ENV SS_SERVER_ADDR 0.0.0.0
ENV SS_SERVER_PORT 8388
ENV SS_PASSWORD password
ENV SS_METHOD aes-256-cfb
ENV SS_TIMEOUT 300

ADD shadowsocks.json /etc/
ADD start.sh /usr/bin/start.sh
RUN chmod 755 /usr/bin/start.sh

EXPOSE $SS_SERVER_PORT

#CMD ["sh", "-c", "/start.sh"]

ENTRYPOINT ["/usr/bin/ssserver"]
