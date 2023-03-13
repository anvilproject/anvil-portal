#!/usr/bin/env bash

#gatsby clean
#npm run build


export BUCKET=s3://anvil.gi.ucsc.edu/
export SRCDIR=public/
aws s3 sync $SRCDIR $BUCKET --delete --profile platform-anvil-dev
aws cloudfront create-invalidation --distribution-id E2DEJ1QLYBYKJ4 --paths "/*" --profile platform-anvil-dev
