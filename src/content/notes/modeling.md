---
title: Modeling
publishDate: 2024-09-23
---

# Modeling

![Curve fitting](./images/curve_fitting.png)

## One-liners

- "All models are wrong, but some are useful." -- George Box
- "A model is a simplification or approximation of reality and hence will not reflect all of reality … While a model can never be "truth," a model might be ranked from very useful, to useful, to somewhat useful to, finally, essentially useless." -— Ken Burnham and David Anderson
- The best model is the simplest model that explains the data -- Occam's razor
- Avoid Simpson's paradox
- It is a must to be aware of [overfitting](/regularization.md)

## Variable modeling

- [Distribution modeling](/distributions.md#popular-choice-of-modeling)

## Two way fixed effects

- [Freedom, Hierarchies and Confounded Estimates](https://nathanielf.github.io/posts/post-with-code/multilevel_confounding/multilevel_models.html#architectures-and-free-parameters)

## Structural modeling

- [Generalized linear models](/generalized-linear-models.md) for modeling the conditional distribution of the response variable $Y$ given the predictors $X$
- [Quantile regression](http://www.econ.uiuc.edu/~roger/research/rq/QRJEP.pdf) for
- [Zero-inflated models](https://discourse.pymc.io/t/modeling-zero-inflation-on-continuous-outcome/6792/4) for count data with excess zeros
  - structural zeros come from some other probabilistic process that prevents an outcome, e.g. failed to capture the non-zero outcome, while sampling zeros come from the data generating process itself, e.g. actual zeros were observed. [ref](https://biol609.github.io/lectures/13_zinfl.html)
  - it can be modeled as a mixture of data-generating processes, usually with a logistic regression model and the target model. [example with ZOIB](https://www.andrewheiss.com/blog/2021/11/08/beta-regression-guide/#zero-inflated-beta-regression-bayesian-style) [example2](https://biol609.github.io/lectures/13_zinfl.html#61_Zero_Inflation,_augmentation,_hurdles,_and_more)
  - Zero-inflated means the main model can observe zeros, but the zero-augmented model can only observe non-zeros.
- Quantile regression for any data with outliers, or when the mean is not of interest, but the median or other quantiles instead. [ref](http://www.econ.uiuc.edu/~roger/research/rq/QRJEP.pdf)
