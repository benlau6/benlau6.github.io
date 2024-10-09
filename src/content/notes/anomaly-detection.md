---
title: Anomaly Detection
publishDate: 2024-09-30
---

# Anomaly Detection

Basically anomalies equal to outliers. There is a special interpretation that anomalies are unusual patterns, which need not to be as extreme as outliers. Usually the anomalies are the minority class in the dataset, so unsupervised learning algorithms are key methods to detect them, such as [clustering](clustering.md). Otherwise, careful examination as described in [imbalanced data](/src/content/notes/imbalanced-data.md) might be needed to perform supervised learning. Another approach could be to model the data generation process, for example by Bayesian structural time series modeling, and detect the anomalies by comparing the model's prediction with the actual data.

## Two approaches

1. Accept those outliers by using robust models that are not sensitive to outliers, e.g. Student's t-regression, whose tails are heavier which interprets the outliers as part of the possible outcomes without altering the model's parameters.
2. Remove those outliers and model the data generating process with the rest of the data, such that the model can capture the underlying pattern of the normal data. So when an outlier comes, it is detected as an anomaly, whose behavior is different from the predicted value from normal data generating process. Note that it works for regression, e.g. for sensor data, because actual anomalies could be observed immediately. However, it might not be applicable for classification, e.g. fraud detection, because frauds shall be prevented, but not observed, which would be too late.

## Use IQR instead of standard deviation for non-normal distributions

- Robustness to outliers: Outliers badly affect the mean and standard deviation of the dataset. These may statistically give erroneous results. The IQR measures the range between the first (Q1) and third (Q3) quartiles, encompassing the middle 50% of the data. This makes it less sensitive to extreme values or outliers.
- Non-Normal skewed distributions: When data is not normally distributed or skewed distributed, the standard deviation may not accurately reflect the spread of the data. The IQR is a better measure of variability in such cases, as it focuses on the central portion of the data. [blog](https://tidsskriftet.no/en/2020/06/medisin-og-tall/mean-and-standard-deviation-or-median-and-quartiles)

## Isolation Forest

## DBSCAN

## Readings

- [李宏毅 Anomaly Detection](https://hackmd.io/@shaoeChen/SJkSrunVL)
