#!/usr/bin/env bash

echo \"Deleting ./out/\"
rm -rf ./out

echo \"Deleting ./build/\"
rm -rf ./build

n 20.10.0
npm ci

mkdir -p build

# Build AnVIL
rm -rf ./out
npm run build-prod:anvil-portal
mv out/* build

export BUCKET=s3://ptm-anvilproject.org.consortia/
export SRCDIR=build/

aws s3 sync  $SRCDIR $BUCKET --delete --profile platform-anvil-portal
aws cloudfront create-invalidation --distribution-id E3PPAMUU6T4255 --paths "/*" --profile platform-anvil-portal
