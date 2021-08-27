#!/bin/bash

set -ex

echo "Working directory: $(pwd)"

echo "Running frontend CI install, test coverage and build"
npm ci
#npm run coverage
npm run build
