#!/usr/bin/env bash

cp README.md dist
# cp CHANGELOG.md dist
cp LICENSE dist
cp package.json dist
cp -R dist/out-tsc/cjs/* dist
cp -R dist/out-tsc/typings/* dist

rm dist/umd.*
rm -fr dist/out-tsc

# npm run readme
