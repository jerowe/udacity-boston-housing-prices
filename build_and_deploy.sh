#!/usr/bin/env bash

## Build the front end angular interface
rm -rf html
cd web-app
rm -rf dist
ng build --prod  --output-hashing none --configuration=production --output-path ../html
cp src/assets/pilgrim-hat.svg ../html/assets/
cp src/assets/pilgrim-hat.svg ../html/
cd ..

## This script relies on having already logged into docker with 'docker login'
docker-compose build --force-rm
#docker-compose restart; docker-compose up -d

### Tag the docker images
docker tag boston-house-prices_boston_housing_server quay.io/jerowe/udacity-boston-housing-server:latest
docker tag boston-house-prices_boston_housing_client quay.io/jerowe/udacity-boston-housing-client:latest

# Upload them to quay
docker push quay.io/jerowe/udacity-boston-housing-server:latest
docker push quay.io/jerowe/udacity-boston-housing-client:latest

