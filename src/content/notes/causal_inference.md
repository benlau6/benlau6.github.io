---
title: Causal Inference
publishDate: 2024-09-20
---

# Causal Inference

- Control the potential confounding variables which could bias the results
- Treatment and control groups
- Assignment mechanism
- Potential outcomes

## Causal Impact

- It uses [state-space models](/state_space_models.md)

## AB Testing

- In Bayesian AB testing, we can use the posterior distribution to calculate the probability of the treatment group being better than the control group by just calculating the proxy equation on each pair of samples from the posterior distributions and take an average [source](https://towardsdatascience.com/bayesian-a-b-testing-in-pymc3-54dceb87af74). E.g. `(blue_button_conversion_rate_samples > red).mean()`.

References:

- [Bayesian A/B Testing](https://towardsdatascience.com/bayesian-a-b-testing-in-pymc3-54dceb87af74)
- [Introduction to Bayesian A/B Testing](https://www.pymc.io/projects/examples/en/latest/causal_inference/bayesian_ab_testing_introduction.html)

### Research papers

- [Statistical Challenges in Online Controlled Experiments: A Review of A/B Testing Methodology](https://www.tandfonline.com/doi/full/10.1080/00031305.2023.2257237#abstract)

## Recommended Readings

- [Causal Inference in Data Science](https://www.yuan-meng.com/posts/causality/)
