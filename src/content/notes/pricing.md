---
title: Pricing
publishDate: 2024-10-18
---

# Pricing

Pricing, aka price optimization, is complicated because of non-linear price elasticity and other potential confounders, which are usually unmeasured. This topic could be seen as a [causal inference](causal-inference.md) problem, where you want to know the effect of price on demand, while controlling for other confounders, such that you can optimize the price.

## Terms

- Exogenous variable: an exogenous variable is one whose measure is determined outside the model and is imposed on the model, and an exogenous change is a change in an exogenous variable.
- Endogenous variable: an endogenous variable is a variable whose measure is determined by the model. An endogenous change is a change in an endogenous variable in response to an exogenous change that is imposed upon the model. An endogenous random variable is correlated with the error term in the econometric model, while an exogenous variable is not.
- Endogeneity: situations in which an explanatory variable is correlated with the error term, usually due to unmeasured confounders. Once the confounding variable is measured, you no longer include it in the error term; and once you no longer include a variable in the error term, it ceases being endogeneity.
- Price elasticity: how demand changes with price

## Case studies

- [online-retail-analytics](online-retail-analytics.md)

## Methods

- Demand forecasting
- Double machine learning for causal inference on price elasticity
- Mixed integer programming for price optimization
- A/B testing for causal inference after production deployment to correct assumptions, and to validate that the price are indeed optimal
