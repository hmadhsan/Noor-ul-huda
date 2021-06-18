FROM nginx:1.21.0-alpine

RUN apk add --no-cache bash

COPY build/ /usr/share/nginx/html