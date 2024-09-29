---
title: metrics
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
- RMSE takes the middle ground between MAE and MSE
- R-squared is the proportion of the variance explained by the model. It is extremely sensitive to outliers.
- MAPE stands for Mean Absolute Percentage Error, only makes sense for values where divisions and ratios make sense, e.g. for temperature. Usually used for forecasting. It is easy to interpret but hard for optimization because it is not everywhere differentiable. Moreover, minimizing it would lead to biased and underestimated forecasts. Another problem is that MAPE is asymmetric in that it puts a heavier penalty on forecasts that exceed the actual than those that are less than the actual. In addition, MAPE emphasizes on the absolute percentage deviation, disregarding the direction of the errors presenting challengers in variance analysis situations where over-forecasting and under-forecasting carry distinct implications. This is particularly not a good measure where the value is oscillating around zero. This would create an outsized MAPE, even though the general trend may be followed.
