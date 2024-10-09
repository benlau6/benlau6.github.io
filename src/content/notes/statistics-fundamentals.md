---
title: Statistics Fundamentals
publishDate: 2024-09-20
---

# Statistics Fundamentals

- Probability vs Likelihood
  - Probabilities are the areas under a fixed distribution
    - $P(x|\theta)$
    - the quantity most people are familiar with which deals with predicting new data given a known model
    - "what is the probability of getting heads six times in a row flipping this 50:50 coin?"
  - while likelihoods are the y-axis values for fixed data points with distributions that can be moved. [StatQuest](https://www.youtube.com/watch?v=pYxNSUDSFH4)
    - $L(\theta|x)$
    - deals with fitting models given some known data
    - "what is the likelihood that this coin is/isn't rigged given that I just flipped heads six times in a row?"
- Probability vs Statistics
  - Probability tells you how to go from a population to a sample, and statistics tell you how to go from a sample to a population.
- Statistics vs Parameters
  - Statistics: observed values; computed based on the sample data
  - Parameters: estimated values; estimated based on sample statistics
- [Statistics vs Estimators](https://www.statlect.com/glossary/unbiased-estimator)
  - A statistics is a function of a sample (data) with no sense of being good or bad. [discussion](https://stats.stackexchange.com/a/47756)
  - An estimator is a function of a sample related to some quantity of the distribution. [ref](https://www.statlect.com/glossary/unbiased-estimator) [ref2](https://wangcc.me/LSHTMlearningnote/inference-basic.html)
  - A quantity is a function of the distribution, referring to some property of the distribution, which is usually unknown and thus has to be estimated. And a statistic is a quantity of the sample.
  - A statistic is not an estimator, but an estimator is a statistic with something added. For example, sample mean can be used as an estimator for the population mean, which is unbiased, while it can also be used as an estimator of the population variance, which is biased for most distributions.
- $\mu$ vs $\hat{\mu}$ vs $\bar{x}$ vs $x$
  - $\mu$: population mean
  - $\hat{\mu}$: estimated population mean
  - $\bar{x}$: sample mean
  - $x$: observed value
- $X$ vs $x$
  - $X$: random variable
  - $x$: observed value

## Finite Population Sampling

n is only ever able to reach N if we sample without replacement, meaning the samples are no longer iid. If we sample with replacement then we never run out of n.

## Why usually we use mean instead of median?

It is because mean is more efficient than median in terms of variance, i.e. it has smaller variance, due to [asymptotic efficiency](<https://en.wikipedia.org/wiki/Efficiency_(statistics)#Asymptotic_efficiency>). However, the median is far more robust to outliers, so if the Gaussian assumption is questionable, median might be preferred. [robust statistics](https://en.wikipedia.org/wiki/Robust_statistics)
