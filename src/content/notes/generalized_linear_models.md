---
title: Generalized Linear Models
publishDate: 2024-09-25
---

# Generalized Linear Models

It makes use of the exponential family of distributions to model the conditional distribution of the response variable given the predictors. The exponential family of distributions is a family of probability distributions.

## How it works?

1. **Link function**: It connects the linear predictor to the expected value of the response distribution.
   - linear (gaussian) regression models use the identity link function.
   - logistic regression models use the logit link function to connect binomial distribution.
2. **Distribution function**: It models the conditional distribution of the response variable given the predictors.
3. **Variance function**: It models the variance of the response variable given the predictors.

## Readings

- [wangcc notes](https://wangcc.me/LSHTMlearningnote/intro-GLM.html)
- [Efron - Exponential Families in Theory and Practice](https://www.amazon.com/Exponential-Institute-Mathematical-Statistics-Textbooks/dp/1108715664)
