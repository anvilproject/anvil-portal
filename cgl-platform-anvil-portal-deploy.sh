#!/usr/bin/env bash

n 16.15.1
npm ci
gatsby clean

export GATSBY_ENV="PROD"
export GATSBY_GCSE_CX="anvil"
export GATSBY_NCPI_GCSE_CX="ncpi"
export GATSBY_GTM_ID="GTM-KMGCR8F"
export GATSBY_GTM_AUTH="IgbX8s-NCGg81Z0eWB6KAQ"

npm run build-ci

export BUCKET=s3://ptm-anvilproject.org/
export SRCDIR=public/
aws s3 sync $SRCDIR $BUCKET --delete --profile platform-anvil-portal
aws cloudfront create-invalidation --distribution-id E3PPAMUU6T4255 --paths "/*" --profile platform-anvil-portal
