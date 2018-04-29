# About Python of Docker
# 
# Version:

FROM centos:7
LABEL maintainer="Dubu Qingfeng <1135326346@qq.com>"

RUN yum -y update; yum clean all
RUN yum -y install epel-release; yum clean all
RUN yum -y install python-pip; yum clean all
RUN yum -y group install "Development Tools"
RUN yum -y install python-virtualenv; yum clean all

ADD . /src

RUN cd /src; pip install -r requirements.txt

EXPOSE 8080

CMD ["python", "/src/index.py"]
