# About shadowsocks of Docker
# 
# Version:1.0.0

FROM ubuntu:14.04
LABEL maintainer="Dubu Qingfeng <1135326346@qq.com>"

ENV REFRESHED_AT 2015-06-05

RUN apt-get -qq update && \
    apt-get install -q -y python-pip python-m2crypto
RUN pip install shadowsocks

ENV SS_SERVER_ADDR 0.0.0.0
ENV SS_SERVER_PORT 8388
ENV SS_PASSWORD password
ENV SS_METHOD aes-256-cfb
ENV SS_TIMEOUT 300

ADD start.sh /start.sh
RUN chmod 755 /start.sh

EXPOSE $SS_SERVER_PORT

CMD ["sh", "-c", "/start.sh"]
