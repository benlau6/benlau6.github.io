---
title: Distributions
publishDate: 2024-09-20
---

# Distributions

![Distribution transformation](./images/distribution_transformations.png)

## Popular choice of modeling

- The heights of a population are normally distributed.
- The sampling distribution of the sample mean is normally distributed if the sample size is large enough, even if the population is not normally distributed (CLT).
- The outcome of a coin flip is Bernoulli distributed.
- The number of heads in n coin flips is binomial distributed.
- The number of successes in n events without replacement is hypergeometric distributed.
- The number of events in a fixed interval of time is Poisson distributed. It assumes the conditional variance is the same as the conditional mean.
- The time between events in a Poisson process is exponentially distributed.
- The number of failures before the r-th success in a sequence of Bernoulli trials is negative binomial distributed. It allows overdispersion, that is, the conditional variance is greater than the conditional mean, even it is substantially higher.
- The number of trials until the first success in a sequence of Bernoulli trials is geometric distributed.
- [Beta geometric distribution] is a compound distribution that is generalization of the geometric distribution. The beta geometric distribution extends geometric distribution by allowing flexibility in how probabilities change from one trial to another. Which is good for churn prediction.
- Gamma distribution is the continuous analog of the negative binomial distribution. [ref](https://besjournals.onlinelibrary.wiley.com/doi/pdf/10.1111/2041-210X.12843).[ref2](https://biol609.github.io/lectures/13_zinfl.html#53_The_error_generating_process)
- Any continuous proportion data without 0s and 1s can be modeled with beta distribution. It can be augmented by zero-inflated / one-inflated model to include 0s and 1s. [example](https://www.andrewheiss.com/blog/2021/11/08/beta-regression-guide/) [ref](https://besjournals.onlinelibrary.wiley.com/doi/10.1111/2041-210X.13234) ![proportional data](./images/proportional_data_decision_tree.webp)
- Asymmetric Laplace distribution is great for quantile regression. It can be parametrized by quantile $q$ as symmetry parameter, mean $\mu$ as location parameter, and standard deviation $\sigma$ as scale parameter $b$. Although drawing quantiles of posterior mean is okay, the shape of curves is essentially the same just shifted up and down, i.e. for the Gaussian family the variability always stays the same. However, using asymmetric Laplace distribution, it allows the model to account for the increased variability in response as the covariates increases. [example](https://www.pymc.io/projects/bart/en/latest/examples/bart_quantile_regression.html#asymmetric-laplace-distribution) [paper](https://doi.org/10.1093/biostatistics/kxj039)
- Zero-sum-normal distribution is a multivariate normal distribution with zero mean and $\sigma^2 (I-n^{-1}J)$ covariance matrix, where $J_{ij}=1$. It is useful to capture the relative difference across some axes, e.g. for modeling seasonality. [doc](https://www.pymc.io/projects/docs/en/latest/api/distributions/generated/pymc.ZeroSumNormal.html)

Check out the [Distribution Explorer#Story](https://distribution-explorer.github.io/discrete/poisson.html) of each distribution for more information.

## Distribution transformation

- Sum of two independent normal random variables is a normal random variable.
  - There are other distributions that have this property, such as the binomial, Cauchy, Poisson, gamma, beta, and Student's t distributions.
- Sum of n independent exponential random variables is a gamma random variable with shape parameter n.
- The Gamma distribution is the continuous analog of the Negative Binomial distribution.
- Bernoulli distribution is a special case of the binomial distribution with n=1.
- Sum of n Bernoulli random variables is a binomial random variable.
- Beta distribution is a special case of the Dirichlet distribution.
- Cauchy distribution distribution is a special case of the Student-t distribution in which $v=1$.
- Normal distribution is a special case of the Student's t distribution.
- A standard normal deviate is a random sample from the standard normal distribution. The Chi Square distribution is the distribution of the sum of squared standard normal deviates. The degrees of freedom of the distribution is equal to the number of standard normal deviates being summed.

Check out the [Distribution Explorer#Related distributions](https://distribution-explorer.github.io/multivariate_continuous/dirichlet.html) of each distribution for more information.

## Acknowledgements

- [Univariate Distribution Relationships Graph](https://www.math.wm.edu/~leemis/chart/UDR/UDR.html)
- [Distribution Explorer](https://distribution-explorer.github.io/index.html)
- [Statistics in Marketing - Continuous Probability Distributions](https://bernard-mlab.com/post/probability-distribution2/)
- [How to Learn Probability Distributions](https://www.youtube.com/watch?v=mBCiKUzwdMs)

## Best Graph for Distributions

![Univariate Distribution Relationship](./images/univariate_distribution_relationship.png)
