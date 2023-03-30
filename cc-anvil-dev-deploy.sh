#!/usr/bin/env bash

n 16.15.1
npm ci
gatsby clean

export GATSBY_ENV="ANVIL-DEV"
export GATSBY_GCSE_CX="anvil"
export GATSBY_NCPI_GCSE_CX="ncpi"

npm run build-ci

export BUCKET=s3://uqc-anvil-portal.dev/
export SRCDIR=public/
aws s3 sync $SRCDIR $BUCKET --delete --profile excira
aws cloudfront create-invalidation --distribution-id EYO1P4DTRZBCE --paths "/*" --profile excira
