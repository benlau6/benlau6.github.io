---
title: Metrics
publishDate: 2024-09-28
---

# Metrics

## Classification

- AUC cares about model overall performance, used for model comparison
- ROC describes the trade-off between TPR and FPR, used for model tuning for business needs
- Recall cares about false negatives (sensitivity)
- Precision cares about false positives
- F1 score is the harmonic mean of precision and recall
- Specificity is the complete opposite of recall
- `confusion matrix(y_true, y_pred)`
- `classification_report(y_true, y_pred)`

## Regression

- MAE stands for Mean Absolute Error, uses l1 norm, less sensitive to outliers. Gradient-based optimization methods do not work well with MAE because of the non-differentiability at zero.
- MSE stands for Mean Squared Error, uses l2 norm, more sensitive to outliers due to the squared term. Harder to interpret due to the squared unit.
- RMSE takes the middle ground between MAE and MSE, which takes square root of sum of squared errors, not as sensitive to outliers as MSE, but more sensitive than MAE. [ref](https://gmd.copernicus.org/articles/15/5481/2022/)
- RMSLE takes RMSE of log1p transformed y and y_pred, acting as a relative error neglecting the scale of data, which give equal penalty to predicting $\hat{y} =1.01$ for true $y=1$ and predicting $\hat{y}=101$ for $y=100$. In general it is great for strictly positive targets that span a large range, and when correct prediction across the order of magnitude is equally important. In contrast, RMSE value will increase in magnitude if the scale of error increases.
- R-squared is the proportion of the variance explained by the model. It is extremely sensitive to outliers.
- MAPE stands for Mean Absolute Percentage Error, only makes sense for values where divisions and ratios make sense, e.g. for temperature. Usually used for forecasting. It is easy to interpret but hard for optimization because it is not everywhere differentiable. Moreover, minimizing it would lead to biased and underestimated forecasts. Another problem is that MAPE is asymmetric in that it puts a heavier penalty on forecasts that exceed the actual than those that are less than the actual. In addition, MAPE emphasizes on the absolute percentage deviation, disregarding the direction of the errors presenting challengers in variance analysis situations where over-forecasting and under-forecasting carry distinct implications. This is particularly not a good measure where the value is oscillating around zero. This would create an outsized MAPE, even though the general trend may be followed.

### Why MAE is smaller than RMSE?

Proof by variance decomposition:

Given that

$$
\text{MAE} = \frac{1}{n} \sum_{i=1}^{n} |y_i - \hat{y}_i|
$$

$$
\text{MSE} = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2
$$

$$
\text{RMSE} = \sqrt{\text{MSE}}
$$

$$
Var[f(X)] = E[f(X)^2] - E[f(X)]^2 >= 0
$$

We have

$$
\begin{align*}
E[f(X)^2] &>= E[f(X)]^2 \\
E[|y_i-\hat{y_i}|^2] &>= E[|y - \hat{y}|]^2  \\
E[(y_i-\hat{y_i})^2] &>= E[|y - \hat{y}|]^2  \\
\text{MSE} &>= \text{MAE}^2 \\
\text{RMSE} &>= \text{MAE}
\end{align*}
$$

Or [proof by triangle inequality](https://stats.stackexchange.com/a/466209)

## Use MAE or RMSE?

It depends on your loss function. If we want to give more penalty to points further away from the mean, i.e. being off by 2x is more than twice as bad as being off by x, then we should use RMSE. If we want to give equal penalty to all points, then we should use MAE. If we want a more aggressive penalty, we can use MSE. [ref](https://stats.stackexchange.com/a/48268)

From another perspective, when your observations' conditional distribution is asymmetric and you want an unbiased fit, you would want to use (R)MSE. The (R)MSE is minimized by the conditional mean, the MAE by the conditional median. So if you minimize the MAE, the fit will be closer to the median and biased. For instance, low volume sales data typically have an asymmetric distribution. If you optimize the MAE, you may be surprised to find that the MAE-optimal forecast is a flat zero forecast. [ref](https://stats.stackexchange.com/a/210857)

Alternatively, quantile regression uses an asymmetric loss function ( linear but with different slopes for positive and negative errors). The quadratic (squared loss) analog of quantile regression is expectile regression.
