[![Build Status](http://5.135.185.191:9090/buildStatus/icon?job=frontend-unit-test)](http://5.135.185.191:9090/job/test/) frontend

[![Build Status](http://5.135.185.191:9090/buildStatus/icon?job=backend-unit-test)](http://5.135.185.191:9090/job/test/) backend

[![codecov](https://codecov.io/gh/npoirey/16AGR/branch/master/graph/badge.svg)](https://codecov.io/gh/npoirey/16AGR)

Features
========
A devellopment stack with Node, React with Redux, postgres, all on docker
This repository is a website designed for the DCS squadron 111111

Setting up dev environment
==========================

Install docker and docker-compose for your host environment

Install npm dependencies for the frontend and backend(do this everytime you change package.json)

    docker-compose run -d --rm web npm install --no-bin-links
    docker-compose run -d --rm back npm install --no-bin-links

use docker-compose to deploy the dev environment

`docker-compose up`

backend API is accessible at localhost:8081 for testing
frontend is at localhost

Run
=====
To run specifics tasks you can use the following command

`docker-compose run [service] [command]`

For example, to install a new dependency

`docker-compose run -d --rm [service] npm install [package] -S --no-bin-links`

resolving node_module problems on windows
https://msdn.microsoft.com/en-us/library/aa365247%28v=vs.85%29.aspx?f=255&MSPPError=-2147217396#maxpath

http://engineroom.teamwork.com/using-cygwins-bash-terminal-in-a-jetbrains-ide/
