Features
========
A devellopment stack with Node + React, all on docker

Setting up dev environment
==========================

Install docker and docker-compose for your host environment

Install npm dependencies for the frontend and backend(do this everytime you change package.json)

    docker-compose run -d web npm install --no-bin-links

 docker exec -it 16agr_web_1 bash

use docker-compose to deploy the dev environment (must be in daemon -d mode

`docker-compose up -d | cat`

backend API is accessible at localhost:8081 for testing
frontend is at localhost

Run
=====
To run specifics tasks you can use the following command

`docker-compose run [service] [command]`

Lint
====

`docker-compose run web npm run eslint`

Build
=====

`docker-compose run web npm run build
`

Install dependency
==================

`dc run -d --rm web npm install sass-loader -S --no-bin-links`
