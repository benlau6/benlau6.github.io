---
title: Generalized Linear Models
publishDate: 2024-09-25
---

# Generalized Linear Models

It is the standard [OLS model](linear-regression.md) with additional assumption on the error term assuming that it comes from the exponential family of distributions.

In different perspective, it models the conditional distribution of the response variable given the predictors. Yet it could be linked as follows:

$$
\begin{aligned}
\epsilon &\sim N(0,1)\\
Y &= X\beta + \epsilon\\
Y &\sim N(X\beta, 1)
\end{aligned}
$$

where Y comes from a deterministic function $h(X)=X\beta+\epsilon$. In probabilistic perspective, X is fixed, but $\epsilon$ is random, so the distribution of Y is also random, which forms the conditional distribution of Y given X. In practical perspective, X is observed, but Y is quite different from the perfect line, so there must be a error term, which is from a certain distribution. [Peter et. al.; 2020; Understanding Regression Analysis; P.52](https://www.routledge.com/Understanding-Regression-Analysis-A-Conditional-Distribution-Approach/Westfall-Arias/p/book/9780367493516)

Note that the key assumption of a GLM is the mean-variance relationship, the actual shape of the distribution, or the data being discrete or not, does not matter as much.

The choice of the distribution can be referred to the [distributions](distributions.md) page.

## How it works?

1. **Link function**: It connects the linear predictor to the expected value of the response distribution. It is the cumulative probability function that the error terms follow. [discussion](https://stats.stackexchange.com/questions/259683/understand-link-function-in-generalized-linear-model/259689#259689)
   - linear (Gaussian) regression models use the identity link function.
   - logistic regression models use the logit link function to connect binomial distribution.
2. **Distribution function**: It models the conditional distribution of the response variable given the predictors.
3. **Variance function**: It models the variance of the response variable given the predictors.

## Readings

- [wangcc notes](https://wangcc.me/LSHTMlearningnote/intro-GLM.html)
- [Efron - Exponential Families in Theory and Practice](https://www.amazon.com/Exponential-Institute-Mathematical-Statistics-Textbooks/dp/1108715664)
- [Bayesian GLM](https://twiecki.io/blog/2013/08/12/bayesian-glms-1/)
- [Hierarchical GLM](https://twiecki.io/blog/2014/03/17/bayesian-glms-3/): Pool and shrinkage effects
- [What if residuals are normally distributed, but y is not?](https://stats.stackexchange.com/questions/12262/what-if-residuals-are-normally-distributed-but-y-is-not/33320#33320)
