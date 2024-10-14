---
title: Linear Regression
publishDate: 2024-10-11
---

# Linear Regression

## Derivation of Normal Equation

Hypothesis function:

$$
h_\theta(X) = X\theta
$$

Cost function:

$$
\begin{aligned}

J(\theta) &= ||h_\theta(X)-Y||^2\\
J(\beta) &= ||X\beta-Y||^2\\
&= (X\beta-Y)^T(X\beta-Y)\\
&= \beta^TX^TX\beta - \beta^TX^TY - Y^TX\beta + Y^TY \\
&= \beta^TX^TX\beta - 2Y^TX\beta + Y^TY
\end{aligned}
$$

Note that $Y^TX\beta = \beta^TX^TY$ because after dot product, they are 1x1 matrix , i.e. scalar, so they are equal.

By minimizing the cost function, i.e. taking derivative of the cost function, we get the normal equation, which is closed form:

$$
\begin{aligned}
\nabla J(\hat{\beta}) &= 2X^TX\beta - 2X^TY = 0\\
X^TX\hat{\beta} &= X^TY\\
\hat{\beta} &= (X^TX)^{-1}X^TY
\end{aligned}
$$

It is also called the ordinary least squares estimator (OLS), because of its linearity and it minimizes the sum of squared errors.

## Limitations

- $X^TX$ might not be invertible, e.g. when number of features $n$ is greater than number of samples $m$.
- $X^TX$ might be singular, i.e. determinant is zero, which means the features are linearly dependent.
- time complexity of matrix inversion $(X^TX)^{-1}$ is $O(n^3)$, which is slow for large $n$, that is why we use gradient descent for large dataset, whose time complexity is $O(knd)$, where $k$ is number of iterations, $n$ is number of samples, and $d$ is number of features.

## where sometimes there is 1/2m in the cost function?

It is just a constant that does not affect the optimization process. It is for ease of calculation and interpretation of the cost. By dividing by m, it normalizes the sum of squared errors by the number of samples (m), so the cost is the mean squared error that is directly comparable to other models. While dividing by 2 is just for the ease of calculation, which cancels out the multiplier of 2 while taking derivative of squared term in the cost function.

## Why OLS?

[Gauss-Markov theorem](https://en.wikipedia.org/wiki/Gauss%E2%80%93Markov_theorem) states that the OLS estimator has the lowest sampling variance among all linear unbiased estimators, i.e. Best Linear Unbiased Estimator (BLUE), if whose errors are uncorrelated, have equal and finite variances, and expectation value of zero. [stackexchange](https://stats.stackexchange.com/questions/29731/regression-when-the-ols-residuals-are-not-normally-distributed)

> Le Cam showed that the mle is optimal among all regular estimators. These are estimators whose distribution is not affected by small changes in the parameter. This is known as Le Cam’s convolution theorem because he showed that the limiting distribution of any regular estimator is equal to the distribution of the mle plus (convolved with) another distribution. (There are, of course, regularity assumptions involved. [ref](https://normaldeviate.wordpress.com/2013/04/05/super-efficiency-the-nasty-ugly-little-fact/)

Note that the errors do not need to be normal distributed, nor do they need to be iid. But note that the estimator has to be unbiased and linear. So squared terms, or regularization terms, are not allowed. In such cases, gradient descent could be used.

## Then why sometimes normality assumption is imposed?

Normality assumption is not for the OLS estimator, but for the [confidence intervals](confidence-intervals.md), and [p-values](p-values.md), i.e. [hypothesis testing](hypothesis-testing.md). Just having an estimator does not provide a full picture. It is essential to know how accurate the estimator is. [discussion](https://stats.stackexchange.com/a/148812)

To measure the accuracy, we need to perform tests, or to construct an interval wrapping around the estimate to justify the estimation process, then it requires a assumed distribution of errors. Most of the justifications rely on being asymptotic, i.e. depending on reasonably large sample. So usually normal distribution would be a good choice due to [central limit theorem](central-limit-theorem.md).

Another example is the sample mean for an exponential distribution, whose sample mean would follow a gamma distribution. The confidence interval of the population mean would then be constructed based on the gamma distribution. For a quick reference, we could check the conjugate prior table and distribution statistics formulas to know which statistics following which distributions. [ref](https://stats.stackexchange.com/questions/525774/is-there-any-assumption-between-confidence-intervals-and-data-normalty) [table](https://en.wikipedia.org/wiki/Conjugate_prior#Table_of_conjugate_distributions) [statistics](https://en.wikipedia.org/wiki/Exponential_distribution)

Actually, we can use [bootstrapping](bootstrapping.md), which uses the empirical distribution to approximates the population distribution, to obtain the confidence intervals without any distribution assumptions including normality, so it allows estimation of the sampling distribution of almost any statistics.

Other than that, we can use Bayesian methods. If the likelihood is in the exponential family, we could find a conjugate prior, which would result in a posterior distribution that is in the same family as the prior. Such posterior distribution can then be used to calculate the 95% credible intervals easily, which is just the $(q_{2.5}, q_{97.5}$, just as the confidence intervals, but with different mindset. Even if the likelihood is not in the exponential family, we can use numerical methods to handle the analytical intractability, such as MCMC, to sample from the posterior distribution. [conjugate priors](conjugate-priors.md)

## Related

- [regularization](regularization.md)

## Readings

- [Bayesian Inference of Noise Levels in Regression](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/bishop-noise-icann-97.pdf)
