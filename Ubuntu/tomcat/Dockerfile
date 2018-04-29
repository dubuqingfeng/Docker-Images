# About tomcat of Docker
# 
# Version:1.0.0

FROM tomcat:7-jre7
LABEL maintainer="Dubu Qingfeng <1135326346@qq.com>"

ADD settings.xml /usr/local/tomcat/conf/
ADD tomcat-users.xml /usr/local/tomcat/conf/

VOLUME ["/usr/local/tomcat/webapps"]
