---
title: Imbalanced Data
publishDate: 2024-10-03
---

# Imbalanced Data

## How to handle it

- Customize the cost function to make predicting the minority class wrong much more costly
- Use the right evaluation metrics
- Use K-fold cross-validation correctly, i.e. stratified K-fold, which distributes the classes evenly in each fold
- Resampling, which includes oversampling, undersampling, and SMOTE
- Use ensemble methods, which ensemble many models with different subsets of the features and data while keeping all the rare classes in each subsamples. For example, split 10000 cases in 10 chunks, with each chunk having all the rare classes, fit a model on each chunk, and ensemble the models.
  - Resample with different ratios, instead of chunking the data into 10 parts evenly, resample the data with different ratios, e.g. 1:1, 1:2, 1:3, 1:4, 1:5, 1:6, 1:7, 1:8, 1:9, 1:10, and ensemble the models.
- Cluster the majority class into r groups, where r represents the number of rare class, and use the centroids as the new data points

Practically, we could just use the right models which includes the above techniques implicitly, e.g. `BalancedBaggingClassifier`, `BalancedRandomForestClassifier`, `EasyEnsembleClassifier`, etc.

## Metrics

Using accuracy, recall or precision will be problematic when the data is imbalanced because the model can blindly predict a single target label to be 100% accurate. Use F1 score while there is no clear preference between recall and precision, or use F-beta score when there is a preference, with beta being the weight of precision. When beta equals 1, it is the same as F1 score. [Accuracy, precision, and recall in multi-class classification](https://www.evidentlyai.com/classification-metrics/multi-class-metrics)

## Readings

- [7 Techniques to Handle Imbalanced Data](https://www.kdnuggets.com/2017/06/7-techniques-handle-imbalanced-data.html)
- [Bagging and Random Forest for Imbalanced Classification](https://machinelearningmastery.com/bagging-and-random-forest-for-imbalanced-classification/)
- [linkedin discussion](https://www.linkedin.com/posts/junaid-syed-2412631b4_ever-faced-this-tricky-data-science-interview-activity-7243438951565291520-a8Q3/?utm_source=share&utm_medium=member_desktop)
