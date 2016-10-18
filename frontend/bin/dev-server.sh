#!/usr/bin/env bash
docker run -d -p 8080:8080 -v ${AGR_ROOT}/frontend:rw sacapuces/frontend > dev.id
