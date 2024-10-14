---
title: Feature Engineering
publishDate: 2024-10-01
---

# Feature Engineering

## Note

- Never apply feature engineering on test data to avoid data leakage.
  - e.g. to impute missing values in test data, use the median of the training data.

## Methods other than one-hot encoding

Why? Because one-hot encoding increases the dimensionality and the sparsity of the data, which most of models don't like. A large company serving millions of users might have millions of categories, so applying one-hot encoding might be infeasible.

Following methods are empirically proven to be useful in Kaggle competitions.

- Target encoding: convert categories to their mean target value, but sensitive to outliers
  - It is somehow leaking information from the fact that it is using the target value, so adding random noise to the target value is a good practice
  - Leave-one-out encoding: target encoding with the target value of the current row excluded, and apply random Gaussian noise to every target value by tuning sigma
  - Beta encoding: target encoding, but also with , and apply beta distribution
  - statistics other than mean, e.g. mode, median, variance, skewness, kurtosis might be used
  - It could be applied to important features instead of the target
- Frequency encoding: convert categories to their frequency, but may make categories with the same frequency indistinguishable

[Other categorical encoders on github](https://github.com/scikit-learn-contrib/category_encoders)

## Why normalization?

## Examples

- [sklearn@Preprocessing](https://scikit-learn.org/stable/auto_examples/preprocessing/index.html)
