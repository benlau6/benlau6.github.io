---
title: Unsupervised Learning
publishDate: 2024-10-11
---

# Unsupervised Learning

## Methods

[clustering](clustering.md)

## How to evaluate

- Does the method perform well in the context of business goal? How well a particular unsupervised method performs will largely depend on why one is doing unsupervised learning in the first place. [stackoverflow](https://stats.stackexchange.com/questions/79028/performance-metrics-to-evaluate-unsupervised-learning)
- Human evaluation
- [Clustering performance evaluation sklearn](https://scikit-learn.org/stable/modules/clustering.html#clustering-performance-evaluation)
- Leave some data out, add the data afterwards, is the model robust?
- Try a downstream auxiliary task. The performance of the downstream task can serve as a surrogate for the performance of the unsupervised learner.

### Readings

- [Evaluation Metrics for Unsupervised Learning Algorithms paper](https://arxiv.org/abs/1905.05667)
