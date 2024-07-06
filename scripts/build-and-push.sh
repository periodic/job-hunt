#!/usr/bin/env bash

set -e

CONTAINER_NAME="docker.havenisms.com/app/jobhunt"

docker build -t $CONTAINER_NAME:latest .
docker push $CONTAINER_NAME:latest
