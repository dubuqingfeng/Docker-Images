FROM python:alpine

RUN apk add --no-cache zip git
COPY * /work/
RUN /usr/bin/crontab /work/crontab.txt
CMD ["sh", "/work/entry.sh"]
# CMD [ "tail", "-f", "/dev/null"]