FROM nginx:1.21.0-alpine

RUN apk add --no-cache bash

ARG STARTUP_SCRIPTS_DIR=/docker-entrypoint.d
ARG NAME_SERVER_CONFIG_SCRIPT=19-name-server-config.sh

ENV NGINX_ENVSUBST_OUTPUT_DIR=/etc/nginx

COPY ${NAME_SERVER_CONFIG_SCRIPT} ${STARTUP_SCRIPTS_DIR}
COPY nginx/templates /etc/nginx/templates/
COPY build/ /usr/share/nginx/html

RUN chmod +x ${STARTUP_SCRIPTS_DIR}/${NAME_SERVER_CONFIG_SCRIPT}