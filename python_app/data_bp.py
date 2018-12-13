from flask import Blueprint, jsonify, request
import json
import pandas as pd
from sklearn.model_selection import train_test_split
import functools
import os

data_bp = Blueprint('boston-housing-data', __name__)

cols = ['RM', 'LSTAT', 'PTRATIO', 'MEDV']
df = pd.read_csv(os.environ.get('HOUSING_DATA'))
prices = df['MEDV']
features = df.drop('MEDV', axis=1)
X_train, X_test, y_train, y_test = train_test_split(features, prices, test_size=0.25, shuffle=True)


@data_bp.route('/read_data', methods=['GET'])
def read_data():
    return df.to_json(orient='records')


@data_bp.route('/get-stats', methods=['GET'])
def get_stats():
    results = {}
    for col in cols:
        results[col] = get_col_stats(df[col])
    return jsonify(results)


def get_col_stats(values):
    """This route can't be hashes, 'Series objects are mutable'"""
    results = {}
    minimum = values.min()
    maximum = values.max()
    mean = values.mean()
    median = values.median()
    std = values.std()
    results['std'] = "{0:.2f}".format(float(std))
    results['minimum'] = "{0:.2f}".format(float(minimum))
    results['maximum'] = "{0:.2f}".format(float(maximum))
    results['mean'] = "{0:.2f}".format(float(mean))
    results['median'] = "{0:.2f}".format(float(median))
    return results

