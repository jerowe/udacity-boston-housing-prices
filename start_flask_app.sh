#!/usr/bin/env bash


#export HOUSING_DATA='/Users/jillian/Dropbox/classes/udacity-machine-learning/boston-house-prices/python_app/materials/housing.csv'
#gunicorn --workers=2 --bind=0.0.0.0:5000 --keep-alive=2000 --timeout=2000 --log-level=debug python_app:flask_app --daemon
gunicorn --workers=2 --bind=0.0.0.0:5000 --keep-alive=2000 --timeout=2000 --log-level=debug python_app:app
