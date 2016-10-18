#!/usr/bin/env bash
docker run --rm -v ${AGR_ROOT}/frontend:/16AGR/frontend:rw sacapuces/frontend $@
