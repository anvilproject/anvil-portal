#!/usr/bin/env bash

echo \"Deleting ./out/\"
rm -rf ./out

echo \"Deleting ./build/\"
rm -rf ./build

n 16.15.1
npm ci

mkdir -p build

# Build AnVIL
rm -rf ./out
npm run build
mv out/* build

export BUCKET=s3://uqc-anvilproject.dev.consortia/
export SRCDIR=build/

aws s3 sync  $SRCDIR $BUCKET --delete --profile excira
aws cloudfront create-invalidation --distribution-id EYO1P4DTRZBCE --paths "/*" --profile excira