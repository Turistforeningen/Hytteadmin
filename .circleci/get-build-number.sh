#!/bin/sh

if [ -z $1 ]; then
  echo "Missing image name parameter"
  exit 1
fi

PREFIX="build--"
if [ ! -z $2 ]; then
  PREFIX="build-$2--"
fi

IMAGES_LIST=$(
  gcloud container images list-tags \
    --limit=2 --filter="tags:$PREFIX*" \
    --sort-by=~TIMESTAMP \
    --format=json \
    eu.gcr.io/dnt-docker-registry-private/$1
)

if [ "$IMAGES_LIST" != "[]" ]
then
  LAST_BUILD=$(
    echo $IMAGES_LIST \
      | jq '.[0].tags[]' \
      | grep "$PREFIX" \
      | sort -r \
      | head -n 1 \
      | tr -d \" \
      | sed "s/${PREFIX}//"
  )
else
  LAST_BUILD="0"
fi

NEXT_BUILD=$(($LAST_BUILD+1))

echo ${PREFIX}${NEXT_BUILD}
