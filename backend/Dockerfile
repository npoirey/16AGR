FROM node:latest

MAINTAINER Poirey Nicolas <fake@mail.com>

#user for jenkins
RUN groupadd -g 800 pic && useradd -g pic -u 800 -d /home/pic -m -s /bin/bash pic

# Create app directory
#RUN mkdir -p /
WORKDIR /16AGR/backend

EXPOSE 8080
CMD [ "npm", "run", "dev" ]

USER pic
