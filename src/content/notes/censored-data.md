---
title: Censored Data
publishDate: 2024-10-13
---

# Censored Data

With truncated or censored data, the parameters would be underestimated without any handling. [pymc example](https://www.pymc.io/projects/examples/en/latest/generalized_linear_models/GLM-truncated-censored-regression.html)

Note that truncated data means those data points outside a certain range are not included, while censored data means those data points outside a certain range are clipped.

There are two approaches to handle censored data:

1. Impute the censored data with a value, e.g. mean, median, or mode
2. Add non-negative random noise to the censored data, learn two models for censored and uncensored data, pool the parameters of the two models. [pymc example](https://www.pymc.io/projects/examples/en/latest/survival_analysis/censored_data.html)
3. Use the censored/truncated distribution directly [censored distribution](https://www.pymc.io/projects/docs/en/latest/api/distributions/censored.html) [truncated distribution](https://www.pymc.io/projects/docs/en/latest/api/distributions/truncated.html). They solves the bias problem by updating the likelihood function to reflect our knowledge about the data generating process that we have zero probability of observing data outside the upper and lower bounds, so the limited range of observed data won't shrink the posterior distribution.
