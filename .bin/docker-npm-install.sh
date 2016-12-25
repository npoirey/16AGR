#!/usr/bin/env bash
echo "docker-compose run -d $1 npm install ${@:2} --no-bin-links"
docker-compose run --rm -d $1 npm install ${@:2} --no-bin-links

