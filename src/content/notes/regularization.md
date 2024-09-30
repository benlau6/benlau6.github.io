---
title: Regularization
publishDate: 2024-09-24
---

# Regularization

Basically, model fitting is to minimize the loss function $L(y, r_d(x))$ over the training data. However, this can lead to overfitting. Regularization is a technique to prevent overfitting by adding a penalty term to the loss function. The penalty term is a function of the complexity of the model, $\Omega(r)$.

$$
\operatorname{minimize} \sum^N_{i=1} L(y_i, r_d(x_i)) + \lambda \Omega(r)
$$

- $r_d(x)$ is a rule where $\hat{y} = r_d(x)$
- L1 regularization (Lasso): $\Omega(r) = \sum^p_{j=1}|\alpha_j|$
  - L1 means using L1 norm
- L2 regularization (Ridge): $\Omega(r) = \sum^p_{j=1}\alpha^2_j$
- Lasso shrinks the less important feature’s coefficient to zero thus, removing some feature altogether. So, this works well for feature selection in case we have a huge number of features.

## [A Probabilistic Interpretation of Regularization](https://bjlkeng.io/posts/probabilistic-interpretation-of-regularization/)

With ordinary linear regression, we have the cost function:

$$
\hat{\beta}_{MLE} = \underset{\beta}{\operatorname{\arg \min}}\ || Y - X\beta ||_2
$$

With L1 or L2 regularization, we have the cost function:

$$
\hat{\beta}_{MLE} = \underset{\beta}{\operatorname{\arg \min}}\ || Y - X\beta ||_2 + \lambda ||\beta||_{norm}
$$

From posterior perspective, we have

$$
P(\theta|X, Y) = \frac{P(Y|X, \theta)P(\theta)}{P(Y|X)}
$$

By finding the maximum of the posterior, taking log in the monotonically increasing function, and getting rid of constant term with respect to the maximization, we have

$$
\begin{aligned}
\hat{\theta}_{MAP} &= \underset{\theta}{\operatorname{\arg \max}}\ P(\theta|X, Y) \\
&= \underset{\theta}{\operatorname{\arg \max}}\ \log P(\theta|X, Y) \\
&= \underset{\theta}{\operatorname{\arg \max}}\ \log P(Y|X, \theta) + \log P(\theta) - \log P(Y|X) \\
&= \underset{\theta}{\operatorname{\arg \max}}\ \log P(Y|X, \theta) + \log P(\theta) \\
\end{aligned}
$$

The first term is the likelihood, and the second term is the prior. So the MLE estimation for linear regression is just the MAP estimation with uniform prior as follows:

$$
\begin{aligned}
\hat{\beta}_{MLE} &=  \underset{\beta}{\operatorname{\arg \max}}\ \log P(Y|X, \beta) \\
&= \underset{\beta}{\operatorname{\arg \min}}\ || Y - X\beta ||_2
\end{aligned}
$$

And the L1 or L2 regularizations are just the MAP estimation for linear regression with different priors. L1 regularization is equivalent to the MAP estimation with a Laplace prior, and L2 regularization is equivalent to the MAP estimation with a Gaussian prior.

[Extra note](https://ycc.idv.tw/deep-dl_3.html)
