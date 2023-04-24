#!/usr/bin/env bash

n 16.15.1
npm ci
gatsby clean

export GATSBY_ENV="ANVIL-PORTAL-CC-DEV"
export GATSBY_GCSE_CX="anvil"
export GATSBY_NCPI_GCSE_CX="ncpi"
export GATSBY_GTM_ID="GTM-KMGCR8F"
export GATSBY_GTM_AUTH="dn4W-jqWUyNBj6ON0Ic_wA"

npm run build-ci

export BUCKET=s3://uqc-anvil-portal.dev/
export SRCDIR=public/
aws s3 sync $SRCDIR $BUCKET --delete --profile excira
aws cloudfront create-invalidation --distribution-id EYO1P4DTRZBCE --paths "/*" --profile excira
