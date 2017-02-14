##Features

Backend dev stack with Node, express, bookshelf, all on docker

##Setting up dev environment

start by following globals instructions in [../README.md](../README.md)

##Run

`docker-compose up [-d]`

backend API is accessible at localhost:8081 for testing

To run specifics tasks you can use the following pattern

`docker exec 16agr_back_1 [command]`

for examples (see available scripts in package.json):

####Tests
`docker exec 16agr_back_1 npm run test`

`docker exec 16agr_back_1 npm run test:watch` 

####Install dependency

`docker exec 16agr_back_1 npm install`

`docker exec 16agr_back_1 npm install [package] --save`

`docker exec 16agr_back_1 npm install [package] --save-dev`

####Init the database

`docker exec 16agr_back_1 npm run db:migrate` (init structure)

`docker exec 16agr_back_1 npm run db:seed` (add data)

`docker exec 16agr_back_1 npm run db:reset` (reset structure and data)
