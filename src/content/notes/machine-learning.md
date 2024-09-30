---
title: Machine Learning
publishDate: 2024-09-21
---

# Machine Learning

## One liners

- precision cares about the cost of false positives, while recall cares about the cost of false negatives
- bias-variance tradeoff: expected error on an unseen sample x = bias^2 + variance + irreducible error; bias is the error from the learning algorithm due to its assumption, e.g. assuming the data is linear when it is actually quadratic; variance is the error from the model's sensitivity to the training data, i.e. having too much freedom; and irreducible error is the error from the noise in the data
  - complex models does not necessarily mean low bias and high variance
  - low bias means the model fail to capture the underlying pattern in the data, while high variance means the model is too sensitive to the training data.
  - The more complex the model f ^ ( x ) {\displaystyle {\hat {f}}(x)} is, the more data points it will capture, and the lower the bias will be. However, complexity will make the model "move" more to capture the data points, and hence its variance will be larger.
- MAE is more robust to outliers than MSE, but it is not differentiable at 0, which can be a problem for optimization, especially for gradient-based methods. RMSE is a compromise between the two.

## Questions to clarify

- How can a Bayesian model be learnt by MCMC?

## Recommended Readings

- [A few useful things to know about machine learning](https://dl.acm.org/doi/pdf/10.1145/2347736.2347755)
