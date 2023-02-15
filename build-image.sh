#!/bin/sh
export DOCKER_BUILDKIT=1 && \
docker build\
 --build-arg BUILDKIT_INLINE_CACHE=1\
 --cache-from myapp-front:deps\
 --target deps\
 --tag myapp-front:deps\
 . && \
docker build\
 --build-arg BUILDKIT_INLINE_CACHE=1\
 --cache-from myapp-front:deps\
 --cache-from myapp-front:builder\
 --target builder\
 --tag myapp-front:builder\
 . && \
docker build\
 --build-arg BUILDKIT_INLINE_CACHE=1\
 --cache-from myapp-front:deps\
 --cache-from myapp-front:builder\
 --cache-from myapp-front:latest\
 --tag myapp-front:latest\
 .