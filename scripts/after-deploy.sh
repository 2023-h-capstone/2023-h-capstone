#!/bin/bash
REPOSITORY=/home/ubuntu/app/dist/ssr

cd $REPOSITORY
sudo npm i
# 참조
# https://unchae.tistory.com/entry/PM2-80-443%ED%8F%AC%ED%8A%B8-%EC%82%AC%EC%9A%A9
authbind --deep pm2 reload index.js --watch
