#!/usr/bin/env bash

cp package.json dist
cp -R dist/out-tsc/cjs/* dist
cp -R dist/out-tsc/typings/* dist

rm dist/umd.*
rm -fr dist/out-tsc

npm run readme

cp README.md dist
# cp CHANGELOG.md dist
cp LICENSE dist
