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

## Link functions

It links the expectation of target distribution conditional on covariates such that $E(Y|X) = \mu = g^{-1}(X\beta)$. There are some common distributions with typical uses and canonical link function: [table](https://en.wikipedia.org/wiki/Generalized_linear_model#Link_function)

- Identity: Normal
- Negative inverse: Gamma, exponential
- Log: Poisson
- Logit: Bernoulli, Binomial, Categorical, Multinomial

In the cases of the exponential and gamma distributions, the domain of the canonical link function is not the same as the permitted range of the mean. In particular, the linear predictor may be positive, which would give an impossible negative mean. When maximizing the likelihood, precautions must be taken to avoid this. An alternative is to use a noncanonical link function.

In the case of the Bernoulli, binomial, categorical and multinomial distributions, the support of the distributions is not the same type of data as the parameter being predicted. In all of these cases, the predicted parameter is one or more probabilities, i.e. real numbers in the range $[0,1]$. The resulting model is known as logistic regression or multinomial logistic regression.

Note that the link function is applying on the mean of Y, not to Y itself, i.e. it is not a log-transformation of Y. So we can back-transform to estimate the mean of Y, while it is not the case in [log transformation](log-transformation.md) due to Jensen's inequality.

### Why link functions

From (Dobson and Barnett, An Introduction to Generalized Linear Models, 2018, p.227)

- It maps the $\beta X$ input space $R$ to the required $Y$ space, e.g. $R$ to $[0,1]$ for logistic regression.
- It models the non-linear relationship between the predictors and the response variable.

Note that the specified distribution for the error term $\epsilon$ does not constraint the output space of $\beta X$ since $Y=\beta X + \epsilon$, which is why the link function is sometimes needed for mapping purpose.

## Why it models the mean of Y instead of directly modeling Y?

- [Why GLMs predict the mean and not the mode?](https://stats.stackexchange.com/questions/174390/why-glms-predict-the-mean-and-not-the-mode)

## Loss functions

- [Blog](https://dafriedman97.github.io/mlbook/content/c2/s1/GLMs.html)
- [Logistic regression](https://medium.com/analytics-vidhya/derivative-of-log-loss-function-for-logistic-regression-9b832f025c2d)
- [Poisson Regression@stanford](https://web.stanford.edu/class/stats200/Lecture27.pdf)

## Readings

- [wangcc notes](https://wangcc.me/LSHTMlearningnote/intro-GLM.html)
- [Efron - Exponential Families in Theory and Practice](https://www.amazon.com/Exponential-Institute-Mathematical-Statistics-Textbooks/dp/1108715664)
- [Bayesian GLM](https://twiecki.io/blog/2013/08/12/bayesian-glms-1/)
- [Hierarchical GLM](https://twiecki.io/blog/2014/03/17/bayesian-glms-3/): Pool and shrinkage effects
- [What if residuals are normally distributed, but y is not?](https://stats.stackexchange.com/questions/12262/what-if-residuals-are-normally-distributed-but-y-is-not/33320#33320)
