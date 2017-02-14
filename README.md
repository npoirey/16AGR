[![Build Status](http://5.135.185.191:9090/buildStatus/icon?job=frontend-unit-test)](http://5.135.185.191:9090/job/test/) frontend

[![Build Status](http://5.135.185.191:9090/buildStatus/icon?job=backend-unit-test)](http://5.135.185.191:9090/job/test/) backend

[![codecov](https://codecov.io/gh/npoirey/16AGR/branch/master/graph/badge.svg)](https://codecov.io/gh/npoirey/16AGR)

Features
========
A devellopment stack with Node, React with Redux, postgres, all on docker
This repository is a website designed for the DCS squadron 16AGR

Setting up dev environment
==========================

Install docker and docker-compose for your host environment

Set up the following env variables (in .bashrc or other depending on your platform)

    export AGR_POSTGRES_PASSWORD=this_is_a_password
    export AGR_POSTGRES_USER=postgres
    export AGR_POSTGRES_DB=agr
    export AGR_SESSION_SECRET='this is secret !'

Start up the containers once (the app won't run yet)

    docker-compose up

Install npm dependencies for the frontend and backend (do this everytime you change package.json)

    docker exec 16agr_back_1 npm install
    docker exec 16agr_web_1 npm install

Reload the containers

    docker-compose restart

backend API is accessible at localhost:8081 for testing
frontend is at localhost

Please see the readme in frontend or backend folder to finish setting up the project

Run
=====
To run specifics tasks, please see the readme in frontend or backend folder

Troubleshoot
============

resolving node_module problems on windows
https://msdn.microsoft.com/en-us/library/aa365247%28v=vs.85%29.aspx?f=255&MSPPError=-2147217396#maxpath

http://engineroom.teamwork.com/using-cygwins-bash-terminal-in-a-jetbrains-ide/
