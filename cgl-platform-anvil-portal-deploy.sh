#!/usr/bin/env bash

n 16.15.1
npm ci
gatsby clean

export GATSBY_ENV="ANVIL-PORTAL-AWS-PROD-CHECKOUT"
export GATSBY_GCSE_CX="anvil"
export GATSBY_NCPI_GCSE_CX="ncpi"

npm run build-ci

export BUCKET=s3://dfo-anvil-portal.dev/
export SRCDIR=public/
aws s3 sync $SRCDIR $BUCKET --delete --profile platform-anvil-portal
aws cloudfront create-invalidation --distribution-id E170EDMDQRPMH9 --paths "/*" --profile platform-anvil-portal
