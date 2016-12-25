#!/usr/bin/env bash
echo "docker-compose run -d $1 npm run ${@:2}"
docker-compose run --rm -d $1 npm run ${@:2}

