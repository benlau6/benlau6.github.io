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

## Why L1 regularization (lasso) leads to sparsity?

Consider a vector $x=(1, \beta)$. The L1 and squared L2 norm are then

$$
\begin{aligned}
||x||_1 &= 1 + |\beta| \\
||x||_2^2 &= 1 + \beta^2
\end{aligned}
$$

Note that the square root is squared out of the L2 norm for a more elegant form in gradient calculation. It can be done because minimizing the L2 norm is equivalent to minimizing the L2 norm squared.

Since the $\beta$ term is squared in the L2 norm, it punishes large $\beta$ more, and it has diminishing return on small $\beta$, which approaches to 0 cost reduction when the $\beta$ is close to 0. So considering cost reduction, the L2 norm will focus on reducing the large $\beta$ when we consider the case containing multiple coefficients, i.e. $\sum^d_{i=1}\beta_i^2$. On the other hand, the L1 norm has equal penalty on large or small $\beta$ in terms of magnitude change, so it will eventually shrink the unimportant $\beta$ to zero. [ref](https://stats.stackexchange.com/a/45644)

## A Probabilistic Interpretation of Regularization

[The blog](https://bjlkeng.io/posts/probabilistic-interpretation-of-regularization/)

With ordinary linear regression, we have the cost function:

$$
\hat{\beta}_{MLE} = \underset{\beta}{\operatorname{\arg \min}}\ || Y - X\beta ||_2
$$

With L1 or L2 regularization, we have the cost function:

$$
\hat{\beta}_{MLE} = \underset{\beta}{\operatorname{\arg \min}}\ || Y - X\beta ||_2 + \lambda ||\beta||_{norm}
$$

From the Bayesian perspective, we have the posterior distribution:

$$
P(\theta|X, Y) = \frac{P(Y|X, \theta)P(\theta)}{P(Y|X)}
$$

By finding the maximum a posteriori, and the facts that solving minimization or maximization of log(f(x)) equals that of f(x) due to monotonically increasing property of log function, i.e. preserving the order, and the same applies to constant multiplication, so we have

$$
\begin{aligned}
\hat{\theta}_{MAP} &= \underset{\theta}{\operatorname{\arg \max}}\ P(\theta|X, Y) \\
&= \underset{\theta}{\operatorname{\arg \max}}\ \log P(\theta|X, Y) \\
&= \underset{\theta}{\operatorname{\arg \max}}\ \log P(Y|X, \theta) + \log P(\theta) - \log P(Y|X) \\
&= \underset{\theta}{\operatorname{\arg \max}}\ \log P(Y|X, \theta) + \log P(\theta) \\
\end{aligned}
$$

Note that we like taking log of the posterior because usually the posterior is a product of many likelihoods, those likelihoods usually contains exponential terms, and we usually assume independent likelihoods, so the log of the posterior will turn the product of likelihoods into sum of log likelihoods, and get rid of the exponential terms.

The first term is the likelihood, and the second term is the prior. So the MLE estimation for linear regression is just the MAP estimation with uniform prior as follows:

$$
\begin{aligned}
\hat{\beta}_{MLE} &=  \underset{\beta}{\operatorname{\arg \max}}\ \log P(Y|X, \beta) \\
&= \underset{\beta}{\operatorname{\arg \min}}\ || Y - X\beta ||_2 \quad \text{since} \; P(Y|X, \beta) \sim \mathcal{N}(X\beta, \sigma^2I)
\end{aligned}
$$

Note: $\underset{\beta}{\operatorname{\arg \max}}$ turns to $\underset{\beta}{\operatorname{\arg \min}}$ because there is a negative sign in the log likelihood, and by taking out negative sign, we have

$$
\begin{aligned}
-f(\hat{\beta}) >= f(\beta)  \iff f(\hat{\beta}) <= -f(\beta)
\end{aligned}
$$

And the L1 or L2 regularizations are just the MAP estimation for linear regression with different priors. L1 regularization is equivalent to the MAP estimation with a Laplace prior, and L2 regularization is equivalent to the MAP estimation with a Gaussian prior.

[Extra note](https://ycc.idv.tw/deep-dl_3.html)
