#!/usr/bin/env bash
docker-compose logs -f $1 | cat
