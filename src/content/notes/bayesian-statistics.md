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

## How to compare Bayesian models?

[Cross validation with LOO](https://users.aalto.fi/~ave/CV-FAQ.html), which is the golden method for Bayesian model comparison. It usually uses [elpd](https://users.aalto.fi/~ave/CV-FAQ.html#12_What_is_the_interpretation_of_ELPD__elpd_loo__elpd_diff), which is the expected log pointwise predictive density as loss function to compare models in general as it measures the goodness of the whole predictive distribution including tails. But developer from Stan also recommend to use application specific [utility and loss functions](https://users.aalto.fi/~ave/CV-FAQ.html#32_The_utility_or_loss) which can provide information whether the predictive accuracy is good enough in practice as compared to application expertise. It is possible that one model is better than others, but still not useful for practice. [ref](https://users.aalto.fi/~ave/CV-FAQ.html#11_Can_other_utility_or_loss_functions_be_used_than_log_predictive_density)

Another method would be prior predictive checks and posterior predictive checks. PPCs are an excellent tool for revising models, simplifying or expanding the current model as one examines how well it fits the data. [ref](https://www.pymc.io/projects/docs/en/stable/learn/core_notebooks/posterior_predictive.html#comparison-between-ppc-and-other-model-evaluation-methods)

## Credible intervals are not unique

The generalization to disconnected or multivariate sets of credible interval is called credible region. Any given probability distribution has an infinite number of credible regions of probability $\alpha$, for example:

- The shortest interval, sometimes called the highest density interval (HDI), is the interval which contains the required mass such that all points within the interval have a higher probability density than points outside the interval. This interval will necessarily include the median whenever $\alpha \geq 0.5$. Besides, when the distribution is unimodal, this interval will include the mode. It is the most common credible interval because unlike equal-tailed intervals that typically exclude 2.5% from each tail of the distribution and always include the median, the HDI is not equal-tailed and therefore always includes the mode(s) of posterior distributions. While this can be useful to better represent the credibility mass of a distribution. [why 89% hdi](https://easystats.github.io/bayestestR/reference/hdi.html#details) [another blog reasoning why 85% hdi](https://easystats.github.io/bayestestR/articles/credible_interval.html#vs--95-ci)
- The smallest region, sometimes called the highest density region (HDR). For a multimodal distribution, this is not necessarily an interval as it can be disconnected. This region will always include the mode.
- A quantile-based interval (QBI) is computed by taking the inter-quantile interval for some quantiles, which could lead to equal-tailed interval (ETI), lowest interval, or many other QBIs.

## Why not Bayesian?

There are things that will reduce out of sample performance, remembering that it is the gain over non-Bayesian methods that you should be judging against not absolute performance. [ref](https://www.reddit.com/r/statistics/comments/149xnr9/has_bayesian_methodology_worked_for_you_in_real/)

The first should be obvious. Using a flat prior when real prior knowledge exists is a mistake. With a flat prior, you mostly just have reinvented maximum likelihood estimation without the benefits of Frequentist statistics.

Bayesian decisions minimize the average loss from having garnered a nonrepresentative sample. The prior serves to contextualize the problem. Without that context, you may be better off with a Frequentist decision, which minimizes the maximum risk.

The second is forgetting that Bayesian methods are generative and not sampling based. There are two consequences for that. The first is that it will be rare for a Bayesian solution to be the best fitting line. The second is that the best Bayesian model may not match the best Frequentist model.

For example, if nature is generating a time series as an autoregressive of degree one variable, the best Bayesian model once the data set is large enough should be an AR(1) model. The best Frequentist model may be an ARIMA(1,2 2) model.

Nonetheless, because the Bayesian likelihood is minimally sufficient for the parameters, it shouldn’t be outperformed out of sample over infinite repetition.

The third is using a Bayesian model when what you really want to do is perform null hypothesis testing. The posterior and the results of null hypothesis tests are not substitutes for each other. They are doing different things. Null hypothesis tests tend to be more conservative. There are circumstances where that is valuable.

Finally, Bayesian models are optimal models. You can make them optimally fragile or optimally robust. If you are not sure you have the true generating model but behave as if you do rather than doing model selection makes you more fragile.

## Why Bayesian?

Bayesian models center the actual generative model very transparently. This makes building and fitting bespoke models straightforward. This does of course require you to have a decent understanding of the generative process, but that can in fact happen. Domain experts may not be able to phrase things as such, but talking to them can inform a statistician as to the structure required and reasonable choices of distributions. [ref](https://www.reddit.com/r/AskStatistics/comments/st2son/how_are_bayesian_statistics_utilized_in_realworld/)

## Recommended Readings

- [機器學習中的貝氏定理：生成模型 (Generative Model) 與判別模型 (Discriminative Model)](https://taweihuang.hpd.io/2017/03/21/mlbayes/)
- [Andrew Heiss Bayes Blog](https://www.andrewheiss.com/blog/)
- [posterior cheat sheet](https://www.andrewheiss.com/blog/2022/09/26/guide-visualizing-types-posteriors/images/posterior-predictions-cheat-sheet_v2-0.pdf)

### Blogs

Bayesian modeling relies heavily on experience and intuition. Here are some blogs that can help to build that intuition:

- [ISYE 6420 Bayesian Statistics](https://areding.github.io/6420-pymc/intro.html#)
