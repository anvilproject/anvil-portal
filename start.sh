#!/usr/bin/env bash

echo \"Deleting ./.cache/\" 
rm -rf ./.cache
echo \"Deleting ./public/\"
rm -rf ./public
export GATSBY_ENV="LOCAL"
export GATSBY_GTM_ID="GTM-M3WNPD2"
export GATSBY_GTM_AUTH="XmC--gyjdRdhmT1647yDCg"
