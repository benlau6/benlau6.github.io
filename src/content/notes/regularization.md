---
title: Regularization
publishDate: 2024-09-24
---

# Regularization

Basically, model fitting is to minimize the loss function $L(y, r_d(x))$ over the training data. However, this can lead to overfitting. Regularization is a technique to prevent overfitting by adding a penalty term to the loss function. The penalty term is a function of the complexity of the model, $\Omega(r)$.

$$
minimize \sum^N_{i=1} L(y_i, r_d(x_i)) + \lambda \Omega(r)
$$

- $r_d(x)$ is a rule where $\hat{y} = r_d(x)$
- L1 regularization (Lasso): $\Omega(r) = \sum^p_{j=1}|\alpha_j|$
  - L1 means using L1 norm
- L2 regularization (Ridge): $\Omega(r) = \sum^p_{j=1}\alpha^2_j$
- Lasso shrinks the less important feature’s coefficient to zero thus, removing some feature altogether. So, this works well for feature selection in case we have a huge number of features.
