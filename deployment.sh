#!/bin/bash

set -e

USERNAME=$1
ACCESS_TOKEN=$2
REPOSITORY=$3
NEW_IMAGE=$4
CONTAINER_NAME='admin_application'
IMAGE_TAG='admin-application'
IMAGE="$REPOSITORY:$NEW_IMAGE"
HOST_URL=$5

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
echo "Setting host url to $HOST_URL"

docker run --detach \
--memory="10m" \
--publish 8081:80 \
--restart=always \
-e HOST_URL="$HOST_URL" \
--name "$CONTAINER_NAME" "$IMAGE"