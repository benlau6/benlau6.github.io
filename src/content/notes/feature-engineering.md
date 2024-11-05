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
- Embedding (Cat2Vec): Train a very simple neural network to predict the target value by the categorical feature, and use the output of the hidden layer as the new feature. [ref](https://www.reddit.com/r/datascience/comments/1ayhbxb/comment/krv5bb7/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)

[Other categorical encoders on github](https://github.com/scikit-learn-contrib/category_encoders)

### Why not dummy encoding?

A 2-element feature vector is enough to provide a unique mapping for a vocabulary of size 3, and this is called dummy coding. Since it is a more compact representation, it is preferred in statistical models that perform better when the inputs are linearly independent.

However, modern machine learning algorithms don't require their inputs to be linearly independent, and use methods such as L1 regularization to prune redundant inputs. Moreover, the additional degree of freedom allows the framework to transparently handle a missing input or any unknown vocabularies in production as all zeros (Lakshmanan, 2020). Therefore, many machine learning frameworks often support only one-hot encoding.

## Common techniques

- Bucketing through histogram equalization: create bins based on quantiles, which would usually guarantee to create uniform distribution, except for repeated values in quantiles. After that, we removed the skewness and therefore can be applied scaling methods.
- Cyclical features: convert cyclical features, e.g. time, day of the week, month, to sine and cosine functions, so that the distance at the boundary is close to 0, i.e. Monday is close to Sunday. However, it is not necessary for tree-based models since they only consider a single feature at a time.
- Fourier transformation: convert a time series data to frequency domain, which is useful for detecting periodic patterns, e.g. seasonality, and it is useful for forecasting. [ref](https://www.analyticsvidhya.com/blog/2024/01/xgboost-for-time-series-forecasting/)
- Aggregation: We can group a noisy feature, e.g. rare or sparse, by bin, or group a noisy feature by another categorical feature, such that the aggregated feature is stable and less noisy.
- Differencing: it is useful in [forecasting](forecasting.md) when the data is non-stationary, i.e. the mean, variance, and covariance are not constant over time. By taking the difference between the current value and the previous value, it removes the trend and makes the data stationary. [ref](https://people.duke.edu/~rnau/411diff.htm) Apart from that, we can use model differencing, e.g. remove a fitted linear trend, seasonality, or other patterns.
- Linearization of exponential growth and inflation: commonly in forecasting, by taking logarithm of a variable, it would converts the exponential growth pattern to a linear growth pattern, and it simultaneously converts the multiplicative (proportional-variance) seasonal pattern to additive (constant-variance) seasonal pattern. So it straightens out exponential growth patterns and reduces heteroscedasticity (i.e., stabilizes variance), but it does not eliminate an upward trend in the data. Moreover, it avoid the need of [deflating](https://people.duke.edu/~rnau/411infla.htm) in monetary value. In this setting, trend measured in natural-log units ≈ percentage growth, errors measured in natural-log units ≈ percentage errors, and coefficients in log-log regressions ≈ proportional percentage changes. [ref](https://people.duke.edu/~rnau/411log.htm) [discussion](https://stats.stackexchange.com/questions/244199/why-is-it-that-natural-log-changes-are-percentage-changes-what-is-about-logs-th)
- Log transformation on skewed data: it is useful when the data is right-skewed, i.e. the right tail is longer than the left tail.
- Log transformation on small changes: small changes in the natural log of a variable are directly interpretable as percentage changes, to a very close approximation, i.e. $log(1+r) \approx r$. [ref](https://people.duke.edu/~rnau/411log.htm)
- Lagged features: if it is assumed that a change in X causes a change in Y, we can model this by using both lagged x and current x as features, and then trees-based models would find the interaction term for us, or we could assign a delta x variable one of the covariates manually. It is a common practice for time series forecasting. [ref](https://scikit-learn.org/1.5/auto_examples/applications/plot_time_series_lagged_features.html)

## Why normalization?

It is useful for models that are sensitive to the scale of the input features, which are:

1. distance-based models, e.g. k-NN, PCA
2. gradient descent-based models, e.g. neural networks, logistic regression
3. regularized models, e.g. lasso regression

It is useful for distance-based models to avoid some variables of high magnitude being dominating. While it helps gradient descent-based models converge faster. And it avoids regularization penalty disproportionally applied to features with larger scales. It also helps interpretability, e.g. the coefficients of linear regression would be directly comparable since they are on the same scale. However, it is not necessary for tree-based models since they are invariant to monotonic transformations of the input features, what they care about is the order of the values, not the scale. [ref](https://scikit-learn.org/stable/auto_examples/preprocessing/plot_scaling_importance.html#)

Note that normalization is different from standardization. Normalization scales the data into a fixed range, e.g. [0, 1], while standardization scales the data to have a mean of 0 and a standard deviation of 1. Min-max scaling is a common normalization technique, which would be sensitive to the outliers, while z-score normalization, i.e. standardization, is a common standardization technique, which would be less sensitive to the outliers.

## Examples

- [sklearn@Preprocessing](https://scikit-learn.org/stable/auto_examples/preprocessing/index.html)
