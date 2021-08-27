#!/bin/bash

set -e

USERNAME=$1
ACCESS_TOKEN=$2
REPOSITORY=$3
NEW_IMAGE=$4
HOST_URL=$5
CONTAINER_NAME='nha_admin_application'
IMAGE_TAG='nha-admin-application'
IMAGE="$REPOSITORY:$NEW_IMAGE"

echo "Logging in docker hub"
docker login --username "$USERNAME" --password "$ACCESS_TOKEN"

echo "Pulling image: $IMAGE"
docker pull "$IMAGE"

docker logout

CONTAINER=$(docker ps --all --filter "name=$CONTAINER_NAME" --format "{{.Names}}")

if [ -n "$CONTAINER" ]; then
  echo "Force stopping container: $CONTAINER"
  docker rm --force "$CONTAINER_NAME"

  for CURRENT_IMAGE in $(docker images --format '{{.Tag}}' | grep "$IMAGE_TAG"); do
    if [ "$CURRENT_IMAGE" != "$NEW_IMAGE" ]; then
      echo "Deleting old image: $CURRENT_IMAGE"
      docker rmi --force $(docker images --filter=reference="$REPOSITORY:$CURRENT_IMAGE" -q)
    fi
  done
fi

echo "Starting container $CONTAINER using new image: $NEW_IMAGE"

docker run --detach \
--memory="256m" \
--publish 8081:8081 \
--restart=always \
--env NHA_HOST_URL="$HOST_URL" \
--name "$CONTAINER_NAME" "$IMAGE"