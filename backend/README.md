##Features

A devellopment stack with Node, express, bookshelf, all on docker

##Setting up dev environment

start by following globals instructions in [../README.md](../README.md)

####Install npm dependencies (do this everytime you change package.json)

`docker-compose run -d --rm back npm install --no-bin-links`

####Init the database

`docker-compose run -d --rm back npm run db:migrate`
    
####Seed the database

`docker-compose run -d --rm back npm run db:seed`

##Run

`docker-compose up -d | cat`

backend API is accessible at localhost:8081 for testing

To run specifics tasks you can use the following command

`docker-compose run [service] [command]`

###Install dependency

`docker-compose run -d --rm back npm install [package to install] -S --no-bin-links`


