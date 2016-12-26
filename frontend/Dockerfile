FROM node:latest

MAINTAINER Poirey Nicolas <fake@mail.com>

#user for jenkins
RUN groupadd -g 800 pic && useradd -g pic -u 800 -d /home/pic -m -s /bin/bash pic

WORKDIR /16AGR/frontend

EXPOSE 8080

USER pic
