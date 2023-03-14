#!/usr/bin/env bash

n 16.15.1
npm ci
gatsby clean
npm run build

export BUCKET=s3://anvil.gi.ucsc.edu/
export SRCDIR=public/
aws s3 sync $SRCDIR $BUCKET --delete --profile platform-anvil-dev
aws cloudfront create-invalidation --distribution-id E3JAUIVOC72EMP --paths "/*" --profile platform-anvil-dev
