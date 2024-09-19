---
title: "Statistics Fundamentals"
publishDate: "2024-09-19"
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
- $\mu$ vs $\hat{\mu}$ vs $\bar{x}$ vs $x$
  - $\mu$: population mean
  - $\hat{\mu}$: estimated population mean
  - $\bar{x}$: sample mean
  - $x$: observed value
- $X$ vs $x$
  - $X$: random variable
  - $x$: observed value