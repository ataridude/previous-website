#!/bin/bash

[[ -z $1 ]] && echo "Usage: $0 tag [push]" && exit 1
[[ -z $2 ]] || PUSH=yes
TAG=$1
IMAGE="ataridude/previous-website"

docker image build -t "${IMAGE}:${TAG}" -t "${IMAGE}:latest" .
if [[ $PUSH == "yes" ]]; then
    docker image push ${IMAGE}:${TAG} && docker image push ${IMAGE}:latest
fi
