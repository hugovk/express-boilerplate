#!/usr/bin/env sh

docker stop exprboil-app-test
docker stop exprboil-mongo-test

docker-compose run --rm app-test /bin/sh -c 'sh /app/scripts/run-tests-docker.sh'
