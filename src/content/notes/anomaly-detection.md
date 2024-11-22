---
title: Anomaly Detection
publishDate: 2024-09-30
---

# Anomaly Detection

Basically anomalies equal to outliers. There is a special interpretation that anomalies are unusual patterns, which need not to be as extreme as outliers. Usually the anomalies are the minority class in the dataset, so unsupervised learning algorithms are key methods to detect them, such as [clustering](clustering.md). Otherwise, careful examination as described in [imbalanced data](imbalanced-data.md) might be needed to perform supervised learning. Another approach could be to model the data generation process, for example by Bayesian structural time series modeling, and detect the anomalies by comparing the model's prediction with the actual data.

## Some algorithms other than machine learning

### Levenshtein distance

Scammers will likely use emails or links that resemble real ones. So we could use the similarity of strings used between any users and celebrities to detect scammers. In this case, we could use Levenshtein distance to calculate the edit distance between two strings due to insertion, deletion, and substitution, which takes O(m\*n) Note that it does not have knowledge of semantics, which is exactly what we need in this case, because scammers usually just alter a few characters to make the link look real, without any semantic meaning. However, we might implement a custom Levenshtein distance function to add more weights on visually similar characters, such as `0` and `O`, `1` and `l`, etc.

### Benford's Law

Benford's Law states that in many naturally occurring collections of numbers, the leading significant digit is likely to be small. For example, in sets that obey the law, the number 1 appears as the most significant digit about 30% of the time, while 9 appears as the most significant digit less than 5% of the time. It is used to detect fraud in accounting, and tax evasion, because people tend to invent numbers with a uniform distribution, while real numbers have a non-uniform distribution. [ref](https://en.wikipedia.org/wiki/Benford%27s_law)

- [Why do Biden's votes not follow Benford's Law?](https://www.youtube.com/watch?v=etx0k1nLn78)
- [Application of Benford’s law in Data Analysis](Application of Benford’s law in Data Analysis)
- [Unveiling the Power of Benford’s Law and how it’s Revolutionizing Data Science](https://medium.com/ds3ucsd/benfords-law-and-its-many-applications-in-data-science-875bac4d562c)

## Two approaches

1. Accept those outliers by using robust models that are not sensitive to outliers, e.g. Student's t-regression, whose tails are heavier which interprets the outliers as part of the possible outcomes without altering the model's parameters.
2. Remove those outliers and model the data generating process with the rest of the data, such that the model can capture the underlying pattern of the normal data. So when an outlier comes, it is detected as an anomaly, whose behavior is different from the predicted value from normal data generating process. Note that it works for regression, e.g. for sensor data, because actual anomalies could be observed immediately. However, it might not be applicable for classification, e.g. fraud detection, because frauds shall be prevented, but not observed, which would be too late.

Or from sklearn, many applications require being able to decide whether a new observation belongs to the same distribution as existing observations(it is an inlier), or should be considered as different (it is an outlier).Often, this ability is used to clean real data sets.Two import distinction must be made:

- novelty detection: the training data is not polluted by outliers, and we are interested in detecting anomalies in new observations. E.g. one-class SVM
- outlier detection: the training data contains outliers, and we need to fit the central mode of the training data, ignoring the deviant observations. E.g. Isolation Forest

## Use IQR instead of standard deviation for non-normal distributions

- Robustness to outliers: Outliers badly affect the mean and standard deviation of the dataset. These may statistically give erroneous results. The IQR measures the range between the first (Q1) and third (Q3) quartiles, encompassing the middle 50% of the data. This makes it less sensitive to extreme values or outliers.
- Non-Normal skewed distributions: When data is not normally distributed or skewed distributed, the standard deviation may not accurately reflect the spread of the data. The IQR is a better measure of variability in such cases, as it focuses on the central portion of the data. [blog](https://tidsskriftet.no/en/2020/06/medisin-og-tall/mean-and-standard-deviation-or-median-and-quartiles)

## One-class SVM

It uses kernel to project features to high-dimensional space. By maximizing the margin between the hyperplane and the data points, it tries to find the hyperplane that separates the data points from the origin the most. [ref](https://cyeninesky3.medium.com/oneclass-svm-%E7%95%B0%E5%B8%B8%E6%AA%A2%E6%B8%AC%E4%BB%BB%E5%8B%99-anomaly-detection-%E7%9A%84%E7%AE%97%E6%B3%95%E7%90%86%E8%A7%A3%E8%88%87%E5%AF%A6%E8%B8%90-cf5f0bbb01c0)

It is a novelty detection algorithm. In one-class SVM, the hyperplane is only learnt from the normal class, while the outliers are ignored. So the training dataset should not contain anomalies, because the model might learn from those anomalies if the algorithm misclassify some anomalies as normal, which will distort the hyperplane. However, it might be fine when the dataset has high dimensionality, or we have no assumption about the distribution of the data. [ref](https://www.cnblogs.com/wj-1314/p/10701708.html)

### Parameters

- `nu`: An upper bound on the fraction of training errors and a lower bound of the fraction of support vectors. Should be in the interval (0, 1]. By default 0.5 will be taken. If the value of nu is small, the model will consider fewer samples as outliers. If it is large, it will consider more samples as outliers, i.e. fewer false negative.
- `kernel`: Specifies the kernel type to be used in the algorithm. It must be one of 'linear', 'poly', 'rbf', 'sigmoid', 'precomputed' or a callable. The default is 'rbf'. [How to select kernel for SVM?](https://stats.stackexchange.com/questions/18030/how-to-select-kernel-for-svm?rq=1)
- `gamma`: Kernel coefficient for 'rbf', 'poly' and 'sigmoid'. It controls the variance who approximate the inverse of sigma. Large gamma will lead to overfitting.

## Isolation Forest

## DBSCAN

[DBSCAN](clustering.md#dbscan) is a density-based clustering algorithm that groups together points that are closely packed together, marking as outliers the points that lie alone in low-density regions.

## Readings

- [李宏毅 Anomaly Detection](https://hackmd.io/@shaoeChen/SJkSrunVL)
- [Content Moderation & Fraud Detection - Patterns in Industry](https://eugeneyan.com/writing/content-moderation/)
