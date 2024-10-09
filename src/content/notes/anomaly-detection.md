---
title: Anomaly Detection
publishDate: 2024-09-30
---

# Anomaly Detection

Basically anomalies equal to outliers. It is highly related to and . Usually the anomalies are the minority class in the dataset, so unsupervised learning algorithms are key methods to detect them, such as [clustering](clustering.md). Otherwise, careful examination as described in [imbalanced data](/src/content/notes/imbalanced-data.md) might be needed to perform supervised learning. Another approach could be to model the data generation process, for example by Bayesian structural time series modeling, and detect the anomalies by comparing the model's prediction with the actual data.

## Use IQR instead of standard deviation for non-normal distributions

- Robustness to outliers: Outliers badly affect the mean and standard deviation of the dataset. These may statistically give erroneous results. The IQR measures the range between the first (Q1) and third (Q3) quartiles, encompassing the middle 50% of the data. This makes it less sensitive to extreme values or outliers.
- Non-Normal skewed distributions: When data is not normally distributed or skewed distributed, the standard deviation may not accurately reflect the spread of the data. The IQR is a better measure of variability in such cases, as it focuses on the central portion of the data. [blog](https://tidsskriftet.no/en/2020/06/medisin-og-tall/mean-and-standard-deviation-or-median-and-quartiles)

## Isolation Forest

## DBSCAN

## Readings

- [李宏毅 Anomaly Detection](https://hackmd.io/@shaoeChen/SJkSrunVL)
