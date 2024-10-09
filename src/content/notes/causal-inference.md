---
title: Causal Inference
publishDate: 2024-09-20
---

# Causal Inference

- Control the potential confounding variables which could bias the results
- Treatment and control groups
- Assignment mechanism
- Potential outcomes

## AB Testing

The idea is to test the behaviour change between two groups. If confidence intervals of the metrics of the treatment group and the control group do not overlap, we can conclude that the treatment group is better than the control group. Or if the confidence interval of the cumulative treatment effects does not overlap with 0, we can conclude that the treatment has a significant effect. We could use the following methods:

- t-test
- Regression discontinuity: point comparison, only for immediate effect
- Difference-in-differences: aggregate the effects
- Bayesian Structural Time Series (Causal Impact): aggregate the effects, isolate some latent factors, e.g. seasonality, trend, etc.

In Bayesian AB testing, we can use the posterior distribution to calculate the probability of the treatment group being better than the control group by just calculating the proxy equation on each pair of samples from the posterior distributions and take an average [source](https://towardsdatascience.com/bayesian-a-b-testing-in-pymc3-54dceb87af74). E.g. `(blue_button_conversion_rate_samples > red).mean()`.

References:

- [Bayesian A/B Testing](https://towardsdatascience.com/bayesian-a-b-testing-in-pymc3-54dceb87af74)
- [Introduction to Bayesian A/B Testing](https://www.pymc.io/projects/examples/en/latest/causal_inference/bayesian_ab_testing_introduction.html)

### Research papers

- [Statistical Challenges in Online Controlled Experiments: A Review of A/B Testing Methodology](https://www.tandfonline.com/doi/full/10.1080/00031305.2023.2257237#abstract)

## Causal Impact (Bayesian Structural Time Series)

- It uses [state-space models](state-space-models.md)

## Recommended Readings

- [Causal Inference in Data Science](https://www.yuan-meng.com/posts/causality/)
- [Demystifying ATE ATT ATU](https://www.andrewheiss.com/blog/2024/03/21/demystifying-ate-att-atu/)
