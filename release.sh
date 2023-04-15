#!/bin/bash
environment=$1

# run test

# generate static build
npm run build:$environment

# deploy build

# serve it locally for testing
serve -s build -l 4000
