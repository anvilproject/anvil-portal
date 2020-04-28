#!/bin/bash

echo "Building for environment: ${CIRCLE_BRANCH}"

if [ "${CIRCLE_BRANCH}" == "master" ]
then
  export GATSBY_ENV=PROD
elif [ "${CIRCLE_BRANCH}" == "staging" ]
then
  export GATSBY_ENV=STAGING
else
  export GATSBY_ENV=DEVELOPMENT
fi

echo "Sucessfull build using GATSBY_ENV: ${GATSBY_ENV}"
