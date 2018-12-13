from flask import Blueprint, jsonify, request
import json
from sklearn.tree import DecisionTreeRegressor
import pandas as pd
from sklearn.model_selection import learning_curve
from sklearn.model_selection import validation_curve
from sklearn.model_selection import ShuffleSplit
import numpy as np
from .data_bp import X_train, y_train
import functools

cv = ShuffleSplit(n_splits=10, test_size=0.2, random_state=0)
train_sizes = np.rint(np.linspace(1, X_train.shape[0] * 0.8 - 1, 9)).astype(int)

model_bp = Blueprint('boston-housing-model', __name__)


@model_bp.route('/model-learning', methods=['POST'])
def model_learning():
    request_data = json.loads(request.data.decode('utf-8'))
    max_depth = request_data.get('max_depth')
    return jsonify(decision_tree_max_depth(max_depth))


@model_bp.route('/model-complexity', methods=['POST'])
def model_complexity():
    return jsonify(get_model_complexity())


@functools.lru_cache(maxsize=100)
def decision_tree_max_depth(max_depth):
    results = {}
    results[max_depth] = {}
    regressor = DecisionTreeRegressor(max_depth=max_depth)

    # Calculate the training and testing scores
    sizes, train_scores, test_scores = learning_curve(regressor, X_train, y_train,
                                                      cv=get_cv(), train_sizes=get_train_sizes(), scoring='r2')

    # Find the mean and standard deviation for smoothing
    train_std = np.std(train_scores, axis=1)
    train_mean = np.mean(train_scores, axis=1)
    test_std = np.std(test_scores, axis=1)
    test_mean = np.mean(test_scores, axis=1)

    results[max_depth]['train_std'] = train_std.tolist()
    results[max_depth]['train_mean'] = train_mean.tolist()
    results[max_depth]['test_std'] = test_std.tolist()
    results[max_depth]['test_mean'] = test_mean.tolist()
    results[max_depth]['sizes'] = sizes.tolist()

    return results


@functools.lru_cache(maxsize=100)
def get_cv(n_splits=10, test_size=0.2, random_state=0):
    return ShuffleSplit(n_splits=n_splits, test_size=test_size, random_state=random_state)


@functools.lru_cache(maxsize=100)
def get_train_sizes():
    return np.rint(np.linspace(1, X_train.shape[0] * 0.8 - 1, 9)).astype(int)


@functools.lru_cache(maxsize=100)
def get_model_complexity():
    results = {}
    max_depth = np.arange(1, 11)
    train_scores, test_scores = validation_curve(DecisionTreeRegressor(), X_train, y_train,
                                                 param_name="max_depth", param_range=max_depth,
                                                 cv=get_cv(), scoring='r2')
    # Find the mean and standard deviation for smoothing
    train_mean = np.mean(train_scores, axis=1)
    train_std = np.std(train_scores, axis=1)
    test_mean = np.mean(test_scores, axis=1)
    test_std = np.std(test_scores, axis=1)

    results['train_std'] = train_std.tolist()
    results['train_mean'] = train_mean.tolist()
    results['test_std'] = test_std.tolist()
    results['test_mean'] = test_mean.tolist()
    results['max_depths'] = max_depth.tolist()
    return results
