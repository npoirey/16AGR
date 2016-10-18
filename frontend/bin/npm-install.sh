#!/usr/bin/env bash
rm -rf ../node_modules
docker run --rm -v ${AGR_ROOT}/frontend:/16AGR/frontend:rw sacapuces/frontend npm install
docker run --rm -v ${AGR_ROOT}/frontend:/16AGR/frontend:rw sacapuces/frontend npm i webpack -S
