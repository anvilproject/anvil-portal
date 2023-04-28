#!/usr/bin/env bash

n 14.16.1
npm ci
gatsby clean

export GATSBY_ENV="ANVIL-DEV"
export GATSBY_GCSE_CX="anvil"
export GATSBY_NCPI_GCSE_CX="ncpi"

npm run build-ci

export BUCKET=s3://anvil.gi.ucsc.edu/
export SRCDIR=public/
aws s3 sync $SRCDIR $BUCKET --delete --profile platform-anvil-dev
aws cloudfront create-invalidation --distribution-id E3JAUIVOC72EMP --paths "/*" --profile platform-anvil-dev
