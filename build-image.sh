#!/bin/sh
export DOCKER_BUILDKIT=1 && \
docker build\
 --build-arg BUILDKIT_INLINE_CACHE=1\
 --cache-from backoffice-front:deps\
 --target deps\
 --tag backoffice-front:deps\
 . && \
docker build\
 --build-arg BUILDKIT_INLINE_CACHE=1\
 --cache-from backoffice-front:deps\
 --cache-from backoffice-front:builder\
 --target builder\
 --tag backoffice-front:builder\
 . && \
docker build\
 --build-arg BUILDKIT_INLINE_CACHE=1\
 --cache-from backoffice-front:deps\
 --cache-from backoffice-front:builder\
 --cache-from backoffice-front:latest\
 --tag backoffice-front:latest\
 .