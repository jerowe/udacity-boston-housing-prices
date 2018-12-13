# Import libraries necessary for this project
import numpy as np
import pandas as pd
from sklearn.model_selection import ShuffleSplit
from sklearn.metrics import r2_score
from sklearn.model_selection import train_test_split
from sklearn.model_selection import learning_curve
from sklearn.model_selection import validation_curve
from sklearn.tree import DecisionTreeRegressor
import json
import matplotlib.pyplot as plt

# Import supplementary visualizations code visuals.py
import materials.visuals as vs

### Read in the data

# Pretty display for notebooks
# Load the Boston housing dataset
data = pd.read_csv(
    '/Users/jillian/Dropbox/classes/udacity-machine-learning/boston-house-prices/python-app/materials/housing.csv')
prices = data['MEDV']
features = data.drop('MEDV', axis=1)

# Success
print("Boston housing dataset has {} data points with {} variables each.".format(*data.shape))

## Statistics

# TODO: Minimum price of the data
minimum_price = prices.min()

# TODO: Maximum price of the data
maximum_price = prices.max()

# TODO: Mean price of the data
mean_price = prices.mean()

# TODO: Median price of the data
median_price = prices.median()

# TODO: Standard deviation of prices of the data
std_price = prices.std()

# Show the calculated statistics
print("Statistics for Boston housing dataset:\n")
print("Minimum price: ${}".format(minimum_price))
print("Maximum price: ${}".format(maximum_price))
print("Mean price: ${}".format(mean_price))
print("Median price ${}".format(median_price))
print("Standard deviation of prices: ${}".format(std_price))


## Developing a model

def performance_metric(y_true, y_predict):
    """ Calculates and returns the performance score between
        true and predicted values based on the metric chosen. """

    # TODO: Calculate the performance score between 'y_true' and 'y_predict'
    score = r2_score(y_pred=y_predict, y_true=y_true)

    # Return the score
    return score


score = performance_metric([3, -0.5, 2, 7, 4.2], [2.5, 0.0, 2.1, 7.8, 5.3])
print("Model has a coefficient of determination, R^2, of {:.3f}.".format(score))
print('')

# TODO: Shuffle and split the data into training and testing subsets
X_train, X_test, y_train, y_test = train_test_split(features, prices, test_size=0.25, shuffle=True)

# Success
print("Training and testing split was successful.")

# vs.ModelComplexity(X_train, y_train)

from sklearn.metrics import make_scorer
from sklearn.model_selection import GridSearchCV


def fit_model(X, y):
    """ Performs grid search over the 'max_depth' parameter for a
        decision tree regressor trained on the input data [X, y]. """

    # Create cross-validation sets from the training data
    cv_sets = ShuffleSplit(n_splits=10, test_size=0.20, random_state=1)

    # TODO: Create a decision tree regressor object
    regressor = DecisionTreeRegressor(max_depth=1)

    # TODO: Create a dictionary for the parameter 'max_depth' with a range from 1 to 10
    params = {'max_depth': range(1, 11)}

    # TODO: Transform 'performance_metric' into a scoring function using 'make_scorer'
    scoring_fnc = make_scorer(r2_score)

    # TODO: Create the grid search cv object --> GridSearchCV()
    # Make sure to include the right parameters in the object:
    grid = GridSearchCV(regressor, params, scoring=scoring_fnc)

    # Fit the grid search object to the data to compute the optimal model
    grid = grid.fit(X, y)

    # Return the optimal model after fitting the data
    return grid.best_estimator_


best_estimator = fit_model(X_train, y_train)

best_max_depth = best_estimator.get_params()['max_depth']
y_predict = best_estimator.predict(X_test)
final_score = performance_metric(y_test, y_predict)

# results = vs.ModelComplexity(X_train, y_train)
# results = vs.ModelLearning(X_train, y_train)
# results_json = json.dumps(results)
#
# print(results_json)
# print('Successfully fit model!')


def plot_corr(df, size=10):
    '''Function plots a graphical correlation matrix for each pair of columns in the dataframe.

    Input:
        df: pandas DataFrame
        size: vertical and horizontal size of the plot'''

    corr = df.corr()
    json = corr.to_json()

    fig, ax = plt.subplots(figsize=(size, size))
    ax.matshow(corr)
    plt.xticks(range(len(corr.columns)), corr.columns)
    plt.yticks(range(len(corr.columns)), corr.columns)
    fig.tight_layout()
    fig.show()


plot_corr(data)
