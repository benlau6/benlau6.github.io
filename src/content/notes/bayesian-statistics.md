---
title: Bayesian Statistics
publishDate: 2024-09-20
---

# Bayesian Statistics

- Bayesian model often refers to generative models.
- [Bayesian inference: are parameters fixed or random?](https://thestatsgeek.com/2015/04/22/bayesian-inference-are-parameters-fixed-or-random/)
  - It is often said (incorrectly) that ‘parameters are treated as fixed by the frequentist but as random by the Bayesian’. For frequentists and Bayesians alike, the value of a parameter may have been fixed from the start or may have been generated from a physically random mechanism. In either case, both suppose it has taken on some fixed value that we would like to know. The Bayesian uses formal probability models to express personal uncertainty about that value. The ‘randomness’ in these models represents personal uncertainty about the parameter’s value; it is not a property of the parameter (although we should hope it accurately reflects properties of the mechanisms that produced the parameter).
  - while there may be certain situations where it might be reasonable to think of parameters as being generated through some stochastic mechanism, otherwise, the treatment of the parameter as a random quantity is a device to represent our uncertainty about its fixed true value.

## Why Bayesian models?

- strong false assumptions can be better than weak true ones, because a learner with the latter needs more data to avoid overfitting. [ref](https://dl.acm.org/doi/pdf/10.1145/2347736.2347755)

### Why Bayesian even if we have a lot of data?

[discussion](https://stats.stackexchange.com/questions/490643/why-should-i-be-bayesian-when-my-dataset-is-large)

- Being Bayesian is not only about information fed through the prior. But even then: Where the prior is zero, no amount of data will turn that over.
- Having a full Bayesian posterior distribution to draw from opens loads and loads of ways to make inference from.
- It is easy to explain a credible interval to any audience whilst you know that most audiences have a very vague understanding of what a confidence interval is.
- Baysian analysis is not limited to point hyptheses and can find that the data is in a region of practical equivalence to a null hypotheses, a Baysian factor can grow your believe in some sort of null hypothesis equivalent where a p value can only accumulate evidence against it. Could you find ways to emulate that via confidence intervals and other Frequentist methods? Probably yes, but Bayes comes with that approach as the standard.
- "But for large enough data, wouldn't the posterior just collapse to the MLE" - what if a posterior was bimodal or if two predictors are correlated so you could have different combinations of e.g. β8 and β9 - a posterior can represent these different combinations, an MLE point estimator does not.

## What does it mean that the data is fixed in Bayesian statistics?

For now the data is fixed in a way that it is all you have, you can't go out and collect infinite additional samples. [ref](https://evalf21.classes.andrewheiss.com/resource/bayes/#confidence-intervals-vs-credible-intervals)

## What does it mean that the parameters vary in Bayesian statistics?

We are uncertain about what the true value of the parameter is, so we model it as a random variable.

## How do we test a hypothesis in Bayesian statistics?

- We can use probability of direction to answer threshold hypothesis, e.g. “How certain are we that this estimate is positive (or negative)?”. We could just draw samples from posterior distribution and calculate the proportion of the draws larger than 0. [ref](https://evalf21.classes.andrewheiss.com/resource/bayes/#probability-of-direction)
- We can use Region of practical equivalence (ROPE) to answer range hypothesis, e.g. “How certain are we that this estimate is lies outside a deadzone?”. We could still simply draw samples and calculate the proportion. Note that a common dead zone is $(-0.1\sigma, 0.1\sigma)$, where $\sigma$ is the standard deviation.

## Bayesian vs Bootstrapping

- Bootstrapping has specified coverage rate only when there is enough samples that empirical CDF approximates original CDF well enough, while Bayesian approach gives correct coverage rate only if priors are correct.
- Bootstrapping should give an approximation of a sampling distribution, while Bayesian approach gives a posterior distribution.
- Bootstrapping aims to estimate the distribution of an estimator to answer how accurate an estimator is estimated, while Bayesian approach aims to estimate the posterior distribution of a parameter. So in some sense, they are similar.
- While modeling for proportions, with rare events, bootstrapping performs poorly since it might includes p=0 or p=1 in some of the samples, while Bayesian approach can handle this by using a Beta distribution as a prior, which excludes 0 and 1.

## Would a Bayesian model overfit?

Yes, it would. But the prior assumptions act as a regularizer, which can be seen as a way to prevent overfitting. As a side note, since the regularization term from prior distributions, Bayesian estimators are intrinsically biased. [regularization](regularization.md#a-probabilistic-interpretation-of-regularization) [discussion](https://stats.stackexchange.com/questions/265094/is-it-true-that-bayesian-methods-dont-overfit)

## Recommended Readings

- [機器學習中的貝氏定理：生成模型 (Generative Model) 與判別模型 (Discriminative Model)](https://taweihuang.hpd.io/2017/03/21/mlbayes/)
- [Andrew Heiss Bayes Blog](https://www.andrewheiss.com/blog/)
- [posterior cheat sheet](https://www.andrewheiss.com/blog/2022/09/26/guide-visualizing-types-posteriors/images/posterior-predictions-cheat-sheet_v2-0.pdf)

### Blogs

Bayesian modeling relies heavily on experience and intuition. Here are some blogs that can help to build that intuition:

- [ISYE 6420 Bayesian Statistics](https://areding.github.io/6420-pymc/intro.html#)
